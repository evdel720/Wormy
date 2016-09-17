# Wormy
  Wormy is written in JavaScript, HTML and CSS.
  It also utilized custom jQueryLite that I built.

  [Live][link]
  [link]:https://evdel720.github.io/Wormy/

  <img src="http://res.cloudinary.com/wkdal720/image/upload/v1474137956/wormy_mqk4wa.png" style="width: 300px;height: auto"/>

## How To Play
  You may get ready first and then click the start button to play. You can use keyboard arrows to turn your wormy but wormy can't turn to the opposite direction. If your wormy hits the wall, it dies. The goal of the game is to get as many apples as you can. Your wormy grows when it gets apple.

## Technical details

### Grow Length
  I unshifted the coords of wormy's head in the segments array and slice the array with its length to update the wormy each time it moves. I also kept the coords as string to maintain its uniqueness.
  ```javascript
  this.segments.unshift(newPos.join(" "));
  this.segments = this.segments.slice(0, this.snakeLength);
  this.head = newPos;
  ```

### Custom jQueryLite
  I used my own jQueryLite that I built earlier to truly understand how it works and test the actual usage.
