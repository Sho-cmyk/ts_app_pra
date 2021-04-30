interface Scoreable {
    readonly totalScore: number;
    render(): void;
}
interface Foodable {
    element: HTMLDivElement;
    clickEventHandler(): void;
}
interface Foodsable {
    elements: NodeListOf<HTMLDivElement>;
    readonly activeElements: HTMLDivElement[];
    readonly activeElementsScore: number[];
}

class Score implements Scoreable {
    private  static instance: Score;
    get totalScore() {
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0)
        //配列は０から始まる。スコアを順番に足していく。
    }
    render() {
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
    }
    private constructor() {}
    static getInstance() {
        //一つのインスタンスを返す処理にする
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
}
class Food implements Foodable { 
    constructor(public element: HTMLDivElement) {
        //Foodsクラスのなかのelementに対する特定の処理はFoodクラス内で行いたいので
        //constructor関数で行う
        //型はHTMLDivElement
        element.addEventListener('click', this.clickEventHandler.bind(this));
        //addEventListenerとは、イベントリスナー（イベントに合わせて実行させる関数）を登録するためのメソッドです。
        //第一引数にイベント名、第二引数に関数
        //clickEventHandlerはコールバック関数のこと
        //↓のコールバック関数の中で使われているthisは正しいスコープではなくなるので注意
        //bind(this)のthisはFoodクラス内のthisであることを示す
        //このコールバック関数内のthisはbindの中のthisと同じthisになる
        //bind(this)が無い場合、thisはelementを指し示す
    }
    clickEventHandler() {
        this.element.classList.toggle('food--active');
        //このelementにfood--activeクラスがあった場合は消す、なかったらつける
        const score = Score.getInstance();
        score.render();
    }
}
class Foods implements Foodsable {
    private static instance: Foods;
    //シングルトンパターン
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    //classがfoodのセレクタを全て取得する
    //querySelectorAllがジェネリクスになっているので、型がhtmldivelementであることを指定する
    private _activeElements: HTMLDivElement[] = [];
    //型はHTMLDivElementで初期値は空の配列であることを指し示す
    private _activeElementsScore: number[] = [];
    //index.htmlのfoodを全て取得しelementsに格納する
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            //elementsをひとつづつelementとして取得する
            if (element.classList.contains('food--active')) {
                //elementがfood--activeというクラスを持っていたらtrue
                this._activeElements.push(element);
                //条件でtrueの場合elementを_activeElements配列に入れる
            }
        })
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            //このelementは全部activeな状態
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                //foodScoreがnullではない場合
                this._activeElementsScore.push(Number(foodScore.textContent))
                //Numberで数字にキャスト
            }
        })
        return this._activeElementsScore;
    }
    private constructor() {
        //constructorをprivateにすることでnewを同じクラス内でしか使用できないようにする
        this.elements.forEach(element => {
            new Food(element);
        })
    }
    static getInstance() {
        if (!Foods.instance) {
            //もしFoods.instanceが何もなかったら
            Foods.instance = new Foods();
            //これは一回しか実行されない
        }
        return Foods.instance;
        //一回実行されるとFoods.instanceを返し続ける
    }
}
const foods = Foods.getInstance();
//Foodsクラスのconstructor関数を実行するためにnewでインスタンスを生成する
