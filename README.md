##  COMP3001 - Technology Management

Live version:
http://comp3001t4.cloudapp.net:3001/#/cycle

We developed a responsive web app, capable of running on desktop and mobile devices. 
After user input of inital and destination location is submitted, model finds the nearest bike stations and calculates:
	1. Number of available bikes (for starting bike station)
	2. Number of free racks (for final bike station)

By using the historical cycle journey dataset, published by TfL, and historical weather from Weather Underground, we aimed to predict the rate of incoming and outgoing bikes at each station by giving a future point in time, weather conditions and other parameters. 

This is not a standard linear regression problem, and therefore machine learning was used to transform the complex correlations between our datasets into linear ones through the means of a number of kernel functions and regression algorithms. This resulted in the creation of a prototype statistical model which can return a ratio of incoming bikes to outgoing bikes.
You can see repo for that here:
[https://github.com/sorig/COMP3001Prediction](https://github.com/sorig/COMP3001Prediction "Prediction Repo")

Here are some demos of the app:
- Responsive splash page ( http://i.imgur.com/yN3r3SZ.gifv & http://i.imgur.com/ZxTTP4y.gifv )
- Search boxes stack at lower screen width's ( http://i.imgur.com/G1973wH.gifv )
- Loading animation when fetching station results from svr ( http://i.imgur.com/8Id9tyN.gifv )
- Autocomplete input form 
![Autocomplete input form](https://raw.githubusercontent.com/martol01/bicycleApp/master/inputForm.png)
- Starting stations shows number of free bikes ![Autocomplete input form](https://raw.githubusercontent.com/martol01/bicycleApp/master/startingStations.png)
- Ending stations shows number of free bikes ![Autocomplete input form](https://raw.githubusercontent.com/martol01/bicycleApp/master/destinationStations.png)
- Best chosen route ![Autocomplete input form](https://raw.githubusercontent.com/martol01/bicycleApp/master/path.png)










