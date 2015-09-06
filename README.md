# Watch Me Fly, PennAppsXII
We built an extensible interface between Pebble and ROS (Robot Operating System), which allows users to control a wide variety of [ROS-enabled robots][1] from quadrotors to the PR2. Using a C Pebble app embedded with a Javascript web client, we send commands to a ROS-integrated Python web server using websockets. These commands are interpreted by the Python node to invoke the appropriate C++ functions to control the robot. We have tested out the app with a quadrotor at the GRASP Lab at UPenn (see [video][3]). Credits to the quadrotor control stack go to developers at [Multi-Robot Systems Lab][2].

[1]: http://wiki.ros.org/Robots
[2]: http://www.kumarrobotics.org/
[3]: https://youtu.be/ivk6Bjj3Kno
