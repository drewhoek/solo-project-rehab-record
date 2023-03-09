# RehabRecord

## Description

Duration: 2 weeks (As of March 9th, 2023)

Welcome to RehabRecord! This app is designed for therapeutic, physical rehab professionals to document their notes on various rehab processes during a rehab session. The context that this app is currently designed for is within a chiropractic rehab setting but has applicability to physical therapy, occupational therapy and other branches of healthcare where documentation for rehab is required.

This project allows users to easily document muscle release areas (muscle work) completed, therapeutic exercises done during the session and allows you to conveniently keep track of how long you've been with a patient for. It will document your time in, time out, total time and units completed with the push of a few buttons.

Users (therapists) also have the ability to create a patient using the patient's name. Once a patient is created, you can create a treatment plan for that patient. Currently, that information would come from an outside source that the doctor has created after examining a patient and deciding what work needs to be done during a rehab session.

After a treatment plan is created, users are able to select through a list of patients that already have treatment plans created and can view that treatment plan to become familiar with the work that the patient needs to have done.

When ready for a session to begin the therapist can select the "Go" button to begin a session for the currently viewing treatment plan.
That will bring them to the main rehab page where all of the documentation occurs. When the patient comes back to rehab the therapist can hit the start button on the timer and begin documenting the rest of what needs to be done. One everything is complete the user can select "Finish" to finish the session and be redirected back to the home page.

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
Users can register as a therapist on visiting the page and are greeted with the goals of the app. If they already have an account they can log in on a separate page via a link on the landing page.

### Using the App

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

Thanks so much to everyone Emerging Prairie especially Katie, Blaine and Mason for amazing instruction and teaching us all that was needed to create a project like this.
