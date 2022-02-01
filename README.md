# Final Project (MonkeyWrench) PLACEHOLDER TO BE UPDATED
![Service Request Page](HTTP PLACEHOLDER)
![Client List Page](HTTP PLACEHOLDER)


## Overview
This was a team project to build a full-stack web application over the course of one week. The website was developed by four individuals remotely using Zoom, Slack, Trello, Git, Figma wireframe, and Github for collaboration.
<br>
<br>
MonkeyWrench is a contractor/customer based maintenance portal where many contractors can connect with many customers to create and respond to service requests. A contractor may establish one or many businesses within their profile and can view their entire client list or search/sort by name, address, service request, and more. Contractors can view requests by day, week, month, and all in accordance with the current date and time to ensure optimal ease of use through our front-end UI. A customer may establish multiple addresses for service requests and use multiple contractors at once. Service requests can be commented on by both customers and contractors to ensure clear and concise communication regarding projects.

### File Structure
[Entites](https://github.com/KPalasti/FinalProject/tree/main/JPAMonkeyWrench/src/main/java/com/skilldistillery/monkeywrench/entities)
[Services](https://github.com/KPalasti/FinalProject/tree/main/MonkeyWrench/src/main/java/com/skilldistillery/monkeywrench/services)
[Repositories](https://github.com/KPalasti/FinalProject/tree/main/MonkeyWrench/src/main/java/com/skilldistillery/monkeywrench/repositories)
[Controllers](https://github.com/KPalasti/FinalProject/tree/main/MonkeyWrench/src/main/java/com/skilldistillery/monkeywrench/controllers)
[Security](https://github.com/KPalasti/FinalProject/tree/main/MonkeyWrench/src/main/java/com/skilldistillery/monkeywrench/security)
[Database Files](https://github.com/KPalasti/FinalProject/tree/main/DB)
[Stylesheets, HTML, & Angular](https://github.com/KPalasti/MidtermProject/ngMonkeyWrench)

## Practices Used
- Object Relational Mapping
- CRUD
- Agile
- Kanban
- Database Design
- Database Accessor Objects
- Test Driven Development
- Pair Programming

## Features
- Account creation
- Login/Logout
- User permissions (you can only edit what you create)
- Creation and updating of service requests
- Search (with category options)
- Comments on service requests

## Technologies
Angular, Java 1.8, JUnit 5, SpringMVC, Spring Boot, Spring Tool Suite, Apache Tomcat Server, HTML, CSS, MAMP, SQL (MySQL), Git terminal, MAC OS, Bootstrap 5, Google, Github, Java Persistence API & Hibernate, MySQL Workbench, Gradle, Trello, Amazon Web Services, Chrome Developer Tools

## Lessons Learned
- **CSS and the pitfalls of templates**
<br>
Templates are great for beginners, however, it quickly became apparent after moving on to the front-end that the template we had used for the navbar, sidebar, and footer created significant headaches with CSS inheritance while working with other pages. In hindsight, after seeing the amount of generic styling used in it, the template should've been cleaned up for use on other pages. This was our first real dive into CSS, however, so this could be expected. Another point to this is to in the future achieve a mutual understanding of page layout and design of things such as buttons, links, interaction.
<br>
<br>

- **Chrome Developer Tools Are Your Friend**
<br>
A bit more to the point of CSS. The Chrome Developer tools greatly helped in troubleshooting issues and were extremely useful with their capability to live edit CSS/HTML
<br>
<br>

- **Git branches**
<br>
Git branches and pull requests were used to great affect. They significantly improved our flexibility to work as a team.
<br>
<br>

- **Working as a team**
<br>
The most significant step in our education with this project was a larger team effort for us. Our previous group projects saw (mostly) work split between 2 people on much smaller applications. Even doubling to four revealed the true need for communication and delegation of tasks to achieve our goals. One thing that should be stressed are coding standards. While we didn't have the time to write a comprehensive documentation on the subject, it was not discussed. In the future, it would be wise for efficiency sake and debugging to have more dialogue about how things should look/be named.

## Project Owners
[CJ Harris](https://github.com/CJHarris1)
<br>
[Kyle Palasti](https://github.com/KPalasti)
<br>
[David Lizon](https://github.com/DavidLizon)
<br>
[Patrek Gill](https://github.com/PatrekGill)

## What Could've Been Done Better
- As discussed above, a better more uniform approach to actually coding/naming conventions would be ideal.
- The CSS and styling also could've used more touch-up across several pages.
- Another level of interfaces to be used on several DAO objects would've been good for keeping a more focused approach to the naming and behavior of their methods.

## Future Implementations
- UI cleanup
- UX Design streamlining
- Service Request approval

## Database Schema
![Database Schema](HTML LINk)
