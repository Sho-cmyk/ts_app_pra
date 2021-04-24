class Score { }
class Food { 
    constructor(public element: HTMLDivElement) {
        //Foodsクラスのなかのelementに対する特定の処理はFoodクラス内で行いたいので
        //constructor関数で行う
        element.addEventListener('click', this.clickEventHandler.bind(this));
        //addEventListenerとは、イベントリスナー（イベントに合わせて実行させる関数）を登録するためのメソッドです。
        //第一引数にイベント名、第二引数に関数
        //bind(this)のthisはFoodクラス内のthisであることを示す
        //bind(this)が無い場合、thisはelementを指し示す
    }
    clickEventHandler() {
        console.log(this);
        this.element.classList.toggle('food--active');
        //このelementにfood--activeクラスがあった場合は消す、なかったらつける
    }
}
class Foods {
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    //classがfoodのセレクタを全て取得する
    //querySelectorAllがジェネリクスになっているので、htmldivelementであることを指定する
    private _activeElements: HTMLDivElement[] = []
    //index.htmlのfoodを全て取得しelementsに格納する
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            //elementsをひとつづつelementとして取得する
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        })
        return this._activeElements;
    }
    constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
}
const foods = new Foods();
//Foodsクラスのconstructor関数を実行するためにnewでインスタンスを生成する
