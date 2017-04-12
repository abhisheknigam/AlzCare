#include "string"
#include "mbed.h"

#include "EthernetInterface.h"
#include "frdm_client.hpp"



#define IOT_ENABLED

//! The activation level of a circuit describes what voltage level is needed to
//! make (in this case) an LED turn ON, or light up. Since the FRDM board's
//! LEDs are active LOW, they must be pulled to GND (or 0, or false) to turn on.
namespace active_low
{
	const bool on = false;
	const bool off = true;
}

DigitalOut red_led(LED1);

InterruptIn g_button_tap(SW2);

//! Network requests cannot be created (getting/setting the resource objects) in
//! secondary threads / interrupt contexts. Instead, we must mark that a value
//! changed in these cases and have the main loop complete the operation.
volatile bool sos_called = false;


void flip() {
    red_led = active_low::on;
    wait(1);
    red_led = active_low::off;
}


void on_tap()
{
    sos_called = true;
        flip();
}


//! A utility function for formatting values to their string equivalent.
void format_resource_value(size_t value, M2MResource* resource)
{
	//! Use sprintf to convert the integral value to a string.
	char result_string[30];
	size_t size = sprintf(result_string, "%u", value);
	
	const uint8_t* buffer = reinterpret_cast<const uint8_t*>(result_string);
	resource->set_value(buffer, size);
}

int main()
{
	// Seed the RNG for networking purposes
    unsigned seed = utils::entropy_seed();
    srand(seed);

	//! There was a mistake in the starting code that turned all LEDS on instead
	//! of turning them off (active_low off/on constants were used in the
	//! wrong place).
    g_led_red = active_low::off;
    g_led_green = active_low::off;
    g_led_blue = active_low::off;

	// Button falling edge is on push (rising is on release)
 
    g_button_tap.fall(&on_tap);

#ifdef IOT_ENABLED
	// Turn on the blue LED until connected to the network
    g_led_blue = active_low::on;

	// Need to be connected with Ethernet cable for success
    EthernetInterface ethernet;
    if (ethernet.connect() != 0)
        return 1;

	// Pair with the device connector
    frdm_client client("coap://api.connector.mbed.com:5684", &ethernet);
    if (client.get_state() == frdm_client::state::error)
        return 1;

	// The REST endpoints for this device
	// Add your own M2MObjects to this list with push_back before client.connect()
    M2MObjectList objects;

    M2MDevice* device = frdm_client::make_device();
    objects.push_back(device);
    
    //! ***********************
    //! Begin Endpoint Creation
    //! ***********************
    
    //! We first need to create the object and instance. Since we only have a
    //! frequency counter (and one of them at that), we only need one object,
    //! and one instance. The object describes the BPM counter interface in
    //! general, while the instance represents a physical counter on the board.
    M2MObject* SOS = M2MInterfaceFactory::create_object("3318");
    M2MObjectInstance* sos_called = SOS->create_object_instance();
    
    //! Set Point allows the user to read/write the SOS value itself through
    //! GET and PUT.
    M2MResource* set_point = sos_called->create_dynamic_resource("5700", "integer", M2MResourceInstance::INTEGER, true);
    set_point->set_operation(M2MBase::GET_PUT_ALLOWED);

    
    units->set_value(reinterpret_cast<const uint8_t*>("SOS"), 3);
    
    //! Once we create our needed endpoints, we have to push the OBJECT.
    objects.push_back(SOS);
    
    //! *********************
    //! End Endpoint Creation
    //! *********************

	// Publish the RESTful endpoints
    client.connect(objects);

	// Connect complete; turn off blue LED forever
    g_led_blue = active_low::off;
#endif

    while (true)
    {
#ifdef IOT_ENABLED
        if (client.get_state() == frdm_client::state::error)
            break;
#endif

        //! Here we must check for when our state is updated asynchronously,
        //! and update the resource values as necessary.
        if (sos_called)
        {
        	//! Our three values that can change may all be updated when the BPM
        	//! changes, so just update them every time to be safe.
        	format_resource_value(sos_called,set_point);
        	
        	sos_called = false;
        }
       
    }

#ifdef IOT_ENABLED
    client.disconnect();
#endif

    return 1;
}
