# RehabRecord

## Description

Duration: 2 weeks (As of March 9th, 2023)

Welcome to RehabRecord! This app is designed for therapeutic, physical rehab professionals to document their notes on various rehab processes during a rehab session. The context that this app is currently designed for is within a chiropractic rehab setting but has applicability to physical therapy, occupational therapy and other branches of healthcare where documentation for rehab is required.

This project allows users to easily document muscle release areas (muscle work) completed, therapeutic exercises done during the session and allows you to conveniently keep track of how long you've been with a patient for. It will document your time in, time out, total time and units completed with the push of a few buttons.

Users (therapists) also have the ability to create a patient using the patient's name. Once a patient is created, you can create a treatment plan for that patient. Currently, that information would come from an outside source that the doctor has created after examining a patient and deciding what work needs to be done during a rehab session.

After a treatment plan is created, users are able to select through a list of patients that already have treatment plans created and can view that treatment plan to become familiar with the work that the patient needs to have done.

When ready for a session to begin the therapist can select the "Go" button to begin a session for the currently viewing treatment plan.
That will bring them to the main rehab page where all of the documentation occurs. When the patient comes back to rehab the therapist can hit the start button on the timer and begin documenting the rest of what needs to be done. One everything is complete the user can select "Finish" to finish the session and be redirected back to the home page.

## Backstory

I worked as a rehab therapist for 2.5 years before attending Emerging Digital Academy and worked with dozens of rehab patients a day. Documentation was done on pen and paper which led to many different errors. This brought about inefficiencies including taking time to audit the paper logs, track down the therapist that made the error and ask questions as to what actually happened during the session. This app is designed to mitigate the need for audits and to overall improve the flow of rehab.

## Vocabulary Context:

Units: Represents a range of time a therapist will be with a patient for

- For example: 1 unit of therapy is comparable to the range of 8-22 minutes of being with a patient, 2 units is between 23-37 minutes

Therapeutic Exercises: Exercises that target the weak areas of the body aimed at strengthening and stabilizing the joints and the spine

Muscle Work (Active Muscle Release or AMR): A process of muscle manipulation that aims to release tension, increase mobility and increase circulation to the area that is being released. THis can be done using specialized tools or a therapist using their hands.

### Prerequisites

- Node.js
- Express
- Redux
- PostgreSQL (version 14 used in this project)
- App to run your database (Postico was used for this project)

### Installation

#### Install Node Packages

Run npm install
Run the command npm server and the server will start
Run the command npm run client and the client will boot up and bring you to the page

#### Create Database

Create database in management software named `RehabRecord_db`
Run SQL commands in the `database.sql` file

## Usage

### Login/Register

**_This project is intended for professional use only and you will not be able to access information without logging in_**
Users can register as a therapist upon visiting the page and are greeted with the goals of the app. If they already have an account they can log in on a separate page via a link on the landing page.

### Using the App

- After Logging in the User page will give the therapist three options to choose from. View a current treatment plan, create a treatment plan or add a patient.

#### Adding a Patient

- This page allows users to add a patient by entering in the patient's first and last name.
- A table of all patients is listed below the input field giving the option to delete a patient and to see if the patient currently has a treatment plan.

#### Adding a Treatment Plan

- This page has users input multiple pieces of information coming from the doctor.
- Once complete the therapist will be redirected to a small page to add the muscle work to the treatment. The muscle work that is selected here will be done during each visit of the treatment plan.
- After creating the treatment plan and adding the muscle work the user will be directed back to the user page.

#### Viewing a Current Treatment Plan

- This page allows users to select from the patients with a treatment plan.
- When viewing a treatment plan you can see an overview of items that need to be done during a rehab session. Exercise area of focus, general location of the affected area and muscle work that will need to be done during the visit.
- If a patient has previous visits during this plan then it will display the therapist that completed the session, the exercises done and the amount of units that was completed.
- Once ready to start a session for that treatment plan, the therapist can select "Go" and be redirected to the main rehab page

#### Completing a Rehab Session

- The main rehab page contains many different components so let's break it down to its separate parts

##### Timer Component

- This component is a sticky bar that will allow the user to have it in view at all times when navigating the main rehab page.
- It contains buttons to start, stop, pause and resume the timer for a rehab session that are conditionally rendered depending on the current state of the timer.
- The start button while start the timer, displaying the time you started and elapsed time as you work with a patient. As well as this it will now display the pause and stop buttons.
- The pause button will pause the current time and render a resume button.
- The resume button will start the time again.
- The stop button will hide all buttons, display start time, end time and total time as well as showing the "Finish" button at the very bottom of the page

##### Exercise Documentation Component

- This component consists of a section to add exercise information including exercise name, exercise variation, sets done, reps done and any notes for that specific exercise and a section to view all of the exercises that were done in a table.
- Therapists are able to select from a list of exercises in the exercise name autocomplete dropdown, once an exercise is selected, the specific variations for that exercise are updated in the variation autocomplete dropdown.

##### Muscle Work Documentation Component

- This component will already be populated with the muscle work areas that need to be completed during the session
- A user just needs to click the checkbox to signify the area has been completed.

##### Review Documentation Component

- This component displays a summary of each of the previous components as well as the "Finish" button when it is shown.
- It displays all of the relevant time information, number of exercises and an indicator of if all of the muscle work is completed
- Once the "Finish" button is click the visit is completed and all information is sent to the database

## Built With

- Javascript
- React
- Node
- Express
- Redux
- HTML/XML
- CSS (Material UI)
- SQL for database

## Acknowledgement

Thanks so much to everyone at Emerging Prairie especially Katie, Blaine and Mason for amazing instruction and teaching us all that was needed to create a project like this.
