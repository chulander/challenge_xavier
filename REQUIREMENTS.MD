#Requirements
###PROBLEM STATEMENT
This is your first day at XYZ Insurance Inc. The company just set their targets for the year and they are looking to expand their product portfolio.
One of the products your team is tasked with building is called Xavier, an online “quick quoting” system. This will be a place where brokers can get a quick quote for private jet liability insurance on behalf of their clients.
You want to get something to market as quick as possible and the first step is to put up a landing page.

####TASK 1: Create a single page web application for the Xavier product. Guidelines:
1. Needs to include some text and images for the intro
2. A hardcoded news section, that initially reads “Coming soon!”
3. The website needs to be accessible and usable from any device, since
brokers are always on the run
4. Note: XYZ Insurance is a stickler for simple and clear UI layouts
You did a great job with Xavier’s homepage! Brokers are now swarming to it looking for more information. Your manager, Michael, wants to be able to manage news posts to keep the brokers from calling and emailing in every day.

####TASK 2: Build an administrative component to the Xavier webpage, from which you can manage news posts. Guidelines:
1. Only authorized personnel should have access to the administrative area
2. The users need to be able to add, edit, delete news posts
3. Each post should have a title, HTML text in the body, and a recorded
timestamp from when it was posted.
Xavier is the hottest thing on the market right now. The management team is super thrilled and want to launch the first version right away. Oren, the Investment Guru at XYZ Insurance Inc. just told your team about this cool new third-party service called Amazing Quote that allows you to compute a private jet liability insurance quote in under 1 min. The service is exposed over a RESTful API. You are tasked to integrate this service on the Xavier website.

####TASK 3: Integrate the Amazing Quote API on the Xavier website. Guidelines:
1. Create a new page on the Xavier website
2. Create a form on the page with the following fields:
a. “Owner Name” (string)
b. “JetModel”(dropdown),options:GulfstreamG650,CessnaA-37
Dragonfly, Cessna Citation Encore
c. “Jet Seat Capacity” (number)
d. “ManufacturingDate”(date)
e. “Purchase Price” (double)
f. “Broker Email” (email)
3. Make an HTTP POST call to the Amazing Quote API
4. Show a loading animation while waiting for the quote
5. Upon a successful quote receival, display it to the broker
6. In the case when the quote could not be computed, we need to display a
message to the broker
7. Send an email to the broker, with a confirmation of the quote
8. Use the API documentation below.
Two months later and you’ve quoted lots of submissions. Impressive! One of the pieces of feedback we’ve gotten though is that brokers get too many emails. Some of them submit 20 quotes per hour and their inbox is getting flooded daily. Brokers would prefer to receive a summary of their quotes every hour. That brings us to your next task :)

####TASK 4: Send quotes to brokers, in batch, every hour. Guidelines:
1. Queue up all the quotes received in an hour
2. Create a scheduled task that checks all the quotes received in an hour and
sends a single email to each broker, with a summary of their quotes
3. The email should have the following format:
“ Xavier Quote Summary:

    1. Quote 1: {Owner Name}, {Jet Model}, {Quoted Price}, {Time submitted}
    2. Quote 2: {Owner Name}, {Jet Model}, {Quoted Price}, {Time submitted}
    3. Quote 3: {Owner Name}, {Jet Model}, {Quoted Price}, {Time submitted}

The CEO loves your team’s work so much that he would like to include it in the quarterly earnings report. There’s one little problem though. Due to the agility of your development process, you did not get to set up any analytics. After a few hours of struggle, you realize that your good engineering choices come to the rescue: you have comprehensive logs of everything processed through the system. You are now tasked to analyze these logs and compute a couple of metrics from the log data. Your manager asks you to create a shell script to perform each of these tasks, so anybody with access to a Unix terminal can query the logs for this information in the future.

####TASK 5: Compute quote metrics from the usage logs. Guidelines:
1. Compute the total number of quote submissions since the launch
2. Compute the number of successful quotes
3. Compute the number of unsuccessful quotes
4. Compute the average premium for the successful quotes
5. Here are some log samples:

    1. [ 2017-02-27T18:58:18+00:00 ] request id = 1234567890, quote status = success, price = 50000.00
    2. [ 2017-02-27T18:59:53+00:00 ] request id = 0987654321, quote status = failure, reason = jet too old