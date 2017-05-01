# AlzhCare -Alzheimer Care Solution

-Umang Hans (6356-4391)			-Abhishek Nigam (4490-4428)
-Karan Vasnani (3527-6069)			-Cristian Duica (8545-1083)

Presentation Link : https://drive.google.com/file/d/0B2EBJgLE82rucmNYMERJZ3BabVU/view


![Alt text](http://i67.tinypic.com/24oytet.png "Architecture")

# INTRODUCTION:

 Alzheimer's disease (AD), also referred to simply as Alzheimer's, is a chronic neurodegenerative disease that usually starts slowly and worsens over time. It is the cause of 60% to 70% of cases of dementia. More than Five million Americans have Alzheimer’s disease. Alzheimer’s disease patients will grow each year as the size and proportion of the U.S. population age 65 and older continue to increase. Alzheimer's Disease is the sixth leading cause of death in the United States. Every 66 seconds someone in the U.S. develops the disease and one in three seniors dies with Alzheimer's or other dementia. Since this disease is so widespread we decided to work towards a solution to assist the patients.

AlzCare is a personal IoT solution, which will help Alzheimer’s patients tackle their daily self-care activities using a series of sensors, beacons and voice based interaction. It will provide a platform for the caretakers to keep a check on the patient’s daily health and receive important notifications without the patient realizing it.

# THE USERS: 
Caretakers and Patients.

# THE PROJECT: 
The project has six basic components: a web app as the dashboard, Amazon echo with Alexa, FRDM-K64F board along with sensors, a Node.js server, beacons, and mobile users. The details of each of these six components are as follows: 

<b>1. Web app</b>:
The web app acts as a dashboard from where the caretaker can:

•	Provide details for the patient.

•	Monitor if the patient presses the distress button and can also reset the notification.

•	Monitor the patient’s activity to understand his/her behavior. 

•	The caretaker can even set important reminders for the patient.




<b>2. Amazon Echo with Alexa</b>: Use Speech transformation from Alexa with Microsoft LUIS API to simulate meaningful real-world conversations. The echo takes voice commands from the patients and provides them with the information that they demand. 
ALEXA: 

Alexa is an intelligent personal assistant developed by Amazon Lab126, made popular by the Amazon Echo. It is capable of voice interaction, music playback, making to-do lists, setting alarms, streaming podcasts, playing audiobooks, and providing weather, traffic, and other real time information. Alexa can also control several smart devices using itself as a home automation hub. Most devices with Alexa allow users to activate the device using a wake-word (such as Echo); other devices require the user to push a button to activate Alexa's listening mode.

# MICROSOFT LUIS API:
 
One of the key problems in human-computer interactions is the ability of the computer to understand what a person wants. LUIS is designed to enable developers to build smart applications that can understand human language and accordingly react to user requests. With LUIS, a developer can quickly deploy an HTTP endpoint that will take the sentences sent to it and interpret them in terms of their intents (the intentions they convey) and entities (key information relevant to the intent).

<b>Natural language processing (NLP)</b>: is a field of computer science, artificial intelligence, and computational linguistics concerned with the interactions between computers and human (natural) languages and, in particular, concerned with programming computers to fruitfully process large natural language corpora. Challenges in natural language processing frequently involve natural language understanding, natural language generation (frequently from formal, machine-readable logical forms), connecting language and machine perception, managing human-computer dialog systems, or some combination thereof.


<b>3. FRDM-K64F board (mbed platform)</b>:
 
The ARM mbed IoT Device Platform provides the operating system, cloud services, tools and developer ecosystem to make the creation and deployment of commercial, standards-based IoT solutions possible at scale.
ARM mbed gives you everything you need to develop Internet of Things (IoT) and embedded devices: full support for over 100 mbed-enabled boards and more than 400 components, tools for writing, building and testing applications, and server and client-side tools to communicate with your devices.
We make use of the board to provide the patient with a means to let their caretake know if they are stressed by pressing the “SOS” button on the board. It will notify the caretaker that the patient is in trouble.

<b>4. Node.js Server</b>: 

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world. As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network application.
We have used the Node.js server to handle all the backend commands and data management. It serves as the base for communication between the various components.

<b>5. Beacons</b>:

The Google beacon platform, built on Eddystone, allows you to deploy your beacons once and use them many times. Build highly personalized features into your app, share your beacons to collaborate with other developers, or use Nearby Notifications to deliver web or app content, with no prior app install required.
We use beacons to detect who is on the front door of the house so that the patient can ask Alexa about the person. 

<b>6. Mobile users</b>: The mobile users play an important part in this project. These days everyone has a mobile device. Our project makes it easier for the caretakers to access the dashboard via mobile devices anywhere and everywhere. Moreover, the patient gets notified about anyone who comes at the door: whether an unknown or a known. If known, the patient can ask Alexa for details.

# PROJECT ARCHITECTURE:

The dashboard and Echo act as the front end of the project for direct interaction with the patient as well as the caretaker. The mbed board acts as a means to report a distress sos signal to the caretaker. The back end has node.js server as the main server for communication and process management among the other components. Alexa obtains its responses from Microsoft LUIS which enables it to retrieve responses from a database maintained for the patients and allow them to be sent to Alexa so that she can continue the conversation.


