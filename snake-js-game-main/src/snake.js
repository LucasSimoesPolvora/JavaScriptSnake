import '../css/style.css';

export class snakeClass{
    constructor(x, y, width, height){
        this._x = x, 
        this._y = y,
        this._width = width,
        this._height = height
    }

    getX(){
        return this._x;
    }

    getY(){
        return this._y;
    }
    
}