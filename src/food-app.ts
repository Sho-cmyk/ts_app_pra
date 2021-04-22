class Score { }
class Food { 
    constructor(public element: HTMLDivElement) {
        element.addEventListener();
    }
}
class Foods {
    elements = document.querySelectorAll('.food');
    //index.htmlのfoodを全て取得しelementsに格納する
    constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
}
const foods = new Foods();
//Foodsクラスのconstructor関数を実行するためにnewでインスタンスを生成する