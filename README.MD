# About

This project is currently __under development__ and 
may undergo __intense refactoring__ in the coming weeks.

-------------------------------------------------------

The program should connect to an internal
 __Java REST service__ to show a _set of metrics_ 
 provided by tools such as __Gira__, __Jenkins__ and __Sonar__,
 for a __Software Development Team__. The backend program is 
 independent of it and is not available in this repository.

The application will continously display relevant metrics about 
the __ongoing Sprint__ of a __Software Development Team__.
These metrics include the distribution of the __estimated points 
for the Sprint__ (for example, how many points are 
_in development_ and how many are _being tested_), the 
__backlog health__ and additional information about __code quality__.

To make the project more __visually communicative__, 
each board is colored according to how things in it are progressing, 
compared to how they are expected to advance 
(for example, if there are too many _critic bugs_, the __Code board__
will turn red, whereas if all _code quality metrics_ are as expected 
or above, the __Code Board__ will be green). The background image of 
the whole application also changes, 
according to the weighted status of all the Boards.
