class ExtendedArray extends Array {
    constructor(...args: any[]) {
        super(...args);
    };
    public squeezeIn(item: any, index: number, toLeft: boolean): Array<any> {
        let flag = false, len = this.length;
        //原地
        if(this[index]=== null || this[index] === undefined) {
            this[index] = item;
            flag = true;
            console.log("原地挤入");
        }
        //向左挤入
        if(toLeft && !flag) {
            for(let i = index - 1; i > -1; i--) {
                if (this[i] === null || this[i] === undefined) {
                    console.log([...this.slice(i, index)]);
                    this.splice(i,index - i,...this.slice(i + 1, index + 1));
                    this[index] = item;
                    flag = true;
                    break;
                }
            }
            console.log("向左挤入",flag);
        }
        //向右挤入
        if(!flag && !toLeft) {
            len++;
            for(let i = index + 1; i < len; i++) {
                if (this[i] === null || this[i] === undefined) {
                    this.splice(index + 1,i - index,...this.slice(index , i));
                    this[index] = item;
                }
            }

        }
        return this;
    }
}

export default ExtendedArray;
