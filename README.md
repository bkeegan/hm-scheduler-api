## Overview

- My goal was to create the appointment logic to be as flexible as possible as requirements often change and developing too rigid of a structure prematurely ends up creating work - the work you do establishing the structure and the work you do layer to modify or remove the constraints when business objects change. For instance, later we might need add a feature where a provider can manually create an appointment for a client and be able to enter in an arbitrary start/end time. 

- Working within the time constraints and also to make this application more portable. I opted to use a sqlite in memory database as opposed a persistant postgres instance. This obviously would not be anywhere remotely production ready. I did run into the hurdle where sqlite does not support native date data type so times are repested in epoch time. Also, the primary keys are a simple incrementing number, in production I'd recommend using a uuid but this would require a database extension to add a custom data type. I also ran into a limitation that sqlite is a signed 32bit integer and all the timestamps needed to be stored as seconds and not milliseconds. If we wanted to keep using timestamps even if the db had a proper date field - I would use some kind of class transformer (i.e. maybe class-transformer library to convert timestamps to date for displaying)... or this could be done in the frontend.

- I did manually name the columns to snake case in the entity definitions. In production I'd have a proper db configuration that would set an automatic naming strategy that would convert the camel camelCase class property to snake_case database columns. 

- I did add a "mock guard" which does nothing but console.log the required permissions defined for the graphql calls. In production I would resolve the user's permissions/roles when they authenticate and modify the https requst server side before hitting the graphql endpoint. Obviously, setting up an authentication system is out of scope for this exercise. 

- Might go without saying, but there is more that would need for this to be a viable scheduling API but those were not listed in the requirements and are treated out of scope (e.g. deleting appointment slots)

- Due to the time constraints I did not implement any of the tests but I left the auto generated files from provisioning the project. There is a lot more I'd do to make production ready code (for instance, some sort of logging structured data and better error handling).



# Usage
After installing npm modules
- Run this command to start the server: ```npm run start:dev```
- Browse to http://localhost:3000/graphql to open the graphql playground

- Run these mutations to provision a client and provider
    ```graphql 
    mutation {
        createClient(input: { firstName: "John", lastName:"Doe" }) {
            id
            firstName
            lastName
        }
    }

    mutation {
        createProvider(input: { firstName: "Jane", lastName:"Doe" }) {
            id
            firstName
            lastName
        }
    }
    ```

- Run this mutation to create some appointment slots

    ```graphql 
    mutation {
        createAppointmentSlotsFromSpan(input: { providerId: 1, startTime: 1822454335, endTime:1822457335 }) {
            id
            providerId
            startTime
            endTime
        }
    }
    ```

- Run this query to see available appoitment slots. You should see all the ones that were just created as they are well into the future (as of time of writing this)
    
    ```graphql 
    query {
        getAvailableAppointmentSlots(input: { providerId: 1 }) {
            startTime
            endTime
            id
        }
    }
    ```

- Run this mutation to reserve an appointment - entering in a valid appointmentSlotId
    
    ```graphql 
    mutation {
        reserveAppointment(input: { appointmentSlotId: 3, clientId: 1 }) {
            id
            reservedTime
        }
    }
    ```


- Run this mutation to confirm a reservation

    ```graphql 
    mutation {
        confirmReservation(input: { appointmentSlotId: 3 }) {
            id
            confirmedTime
        }
    }
    ```

- Run this query to show all appointment slots
    
    ```graphql 
    query {
        findAllAppointSlots {
            startTime
            endTime
            confirmedTime
            reservedTime
        }
    }
    ```

