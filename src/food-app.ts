class Score {
    private  static instance: Score;
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0)
    }
    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
    private constructor() {}
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
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
        this.element.classList.toggle('food--active');
        //このelementにfood--activeクラスがあった場合は消す、なかったらつける
        const score = Score.getInstance();
        score.render();
    }
}
class Foods {
    private static instance: Foods;
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    //classがfoodのセレクタを全て取得する
    //querySelectorAllがジェネリクスになっているので、htmldivelementであることを指定する
    private _activeElements: HTMLDivElement[] = [];
    private _activeElementsScore: number[] = [];
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
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                this._activeElementsScore.push(Number(foodScore.textContent))
            }
        })
        return this._activeElementsScore;
    }
    private constructor() {
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();
//Foodsクラスのconstructor関数を実行するためにnewでインスタンスを生成する
