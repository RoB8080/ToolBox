enum Source {
    Hex,
    RGB,
    Hue,
    SL,
    SV
}

class Main {
    private _hex: string = "000000";
    private calculating: boolean = false;
    public get hex():string {
        return this._hex;
    }
    public set hex(val: string) {
        if(val !== this._hex  && !this.calculating) {
            this.calculating = true;
            this._hex = val;
            this._red = parseInt(val.substr(0,2),16);
            this._green = parseInt(val.substr(2,2),16);
            this._blue = parseInt(val.substr(4,2),16);
            this.rgbChange(Source.Hex);
        }
    }

    private _red: number = 0;
    public get red(): number {
        return this._red;
    }
    public set red(val: number) {
        if(val !== this._red && !this.calculating) {
            this.calculating = true;
            this._red = val;
            this.rgbChange(Source.RGB);
        }
    };

    private _green: number = 0;
    public get green(): number {
        return this._green;
    }
    public set green(val: number) {
        if(val !== this._green && !this.calculating) {
            this.calculating = true;
            this._green = val;
            this.rgbChange(Source.RGB);
        }
    };

    private _blue: number = 0;
    public get blue(): number {
        return this._blue;
    }
    public set blue(val: number) {
        if(val !== this._blue && !this.calculating) {
            this.calculating = true;
            this._blue = val;
            this.rgbChange(Source.RGB);
        }
    };

    private _hue: number = 0;
    public get hue():number {
        return this._hue;
    }
    public set hue(val: number) {
        if(val !== this._hue && !this.calculating) {
            this.calculating = true;
            let h = this._hue = val, s = this._sHSV, v = this._vHSV,
                hi = Math.floor(h / 60),
                f = h / 60 - hi,
                p = v * (1 - s) * 255,
                q = v * (1 - f * s) * 255,
                t = v * (1 - ( 1 - f ) * s) * 255;
            v = v * 255;
            switch(hi) {
                case 0: this._red = v; this._green = t; this._blue = p; break;
                case 1: this._red = q; this._green = v; this._blue = p; break;
                case 2: this._red = p; this._green = v; this._blue = t; break;
                case 3: this._red = p; this._green = q; this._blue = v; break;
                case 4: this._red = t; this._green = p; this._blue = v; break;
                case 5: this._red = v; this._green = p; this._blue = q; break;
            }
            this.rgbChange(Source.Hue);
        }
    }

    private _sHSL: number = 0;
    public get sHSL():number {
        return this._sHSL;
    }
    public set sHSL(val: number) {
        if(val !== this._sHSL && !this.calculating) {
            this.calculating = true;
            let h = this._hue, s = this._sHSL = val, l = this._lHSL,
                q = l < 1 / 2 ? l * (1 + s) : l + s - (l * s),
                p = 2 * l - q,
                hk = h / 360,
                tC = [hk + 1 / 3, hk, hk - 1 / 3];
            tC.forEach(function(e, i){
                if(e < 0) {
                    e++;
                }
                else if(e > 1) {
                    e--;
                }
                if(e < 1 / 6) {
                    e = p + ((q - p) * 6 * e);
                } else if (e < 1 / 2) {
                    e = q;
                } else if (e < 2 / 3) {
                    e = p + ((q - p) * 6 * (2 / 3 - e));
                } else {
                    e = p;
                }
                tC[i] = e;
            });
            this._red = tC[0] * 255;
            this._green = tC[1] * 255;
            this._blue = tC[2] * 255;
            this.rgbChange(Source.SL);
        }
    }

    private _lHSL: number = 0;
    public get lHSL():number {
        return this._lHSL;
    }
    public set lHSL(val: number) {
        if(val !== this._lHSL && !this.calculating) {
            this.calculating = true;
            let h = this._hue, s = this._sHSL, l = this._lHSL = val,
                q = l < 1 / 2 ? l * (1 + s) : l + s - (l * s),
                p = 2 * l - q,
                hk = h / 360,
                tC = [hk + 1 / 3, hk, hk - 1 / 3];
            tC.forEach(function(e, i){
                if(e < 0) {
                    e++;
                }
                else if(e > 1) {
                    e--;
                }
                if(e < 1 / 6) {
                    e = p + ((q - p) * 6 * e);
                } else if (e < 1 / 2) {
                    e = q;
                } else if (e < 2 / 3) {
                    e = p + ((q - p) * 6 * (2 / 3 - e));
                } else {
                    e = p;
                }
                tC[i] = e;
            });
            this._red = tC[0] * 255;
            this._green = tC[1] * 255;
            this._blue = tC[2] * 255;
            this.rgbChange(Source.SL);
        }
    }

    private _sHSV: number = 0;
    public get sHSV():number {
        return this._sHSV;
    }
    public set sHSV(val: number) {
        if(val !== this._sHSV && !this.calculating) {
            this.calculating = true;
            let h = this._hue, s = this._sHSV = val, v = this._vHSV,
                hi = Math.floor(h / 60),
                f = h / 60 - hi,
                p = v * (1 - s) * 255,
                q = v * (1 - f * s) * 255,
                t = v * (1 - ( 1 - f ) * s) * 255;
            v = v * 255;
            switch(hi) {
                case 0: this._red = v; this._green = t; this._blue = p; break;
                case 1: this._red = q; this._green = v; this._blue = p; break;
                case 2: this._red = p; this._green = v; this._blue = t; break;
                case 3: this._red = p; this._green = q; this._blue = v; break;
                case 4: this._red = t; this._green = p; this._blue = v; break;
                case 5: this._red = v; this._green = p; this._blue = q; break;
            }
            this.rgbChange(Source.SV);
        }
    }

    private _vHSV: number = 0;
    public get vHSV():number {
        return this._vHSV;
    }
    public set vHSV(val: number) {
        if(val !== this._vHSV && !this.calculating) {
            this.calculating = true;
            let h = this._hue, s = this._sHSV, v = this._vHSV = val,
                hi = Math.floor(h / 60),
                f = h / 60 - hi,
                p = v * (1 - s) * 255,
                q = v * (1 - f * s) * 255,
                t = v * (1 - ( 1 - f ) * s) * 255;
            v = v * 255;
            switch(hi) {
                case 0: this._red = v; this._green = t; this._blue = p; break;
                case 1: this._red = q; this._green = v; this._blue = p; break;
                case 2: this._red = p; this._green = v; this._blue = t; break;
                case 3: this._red = p; this._green = q; this._blue = v; break;
                case 4: this._red = t; this._green = p; this._blue = v; break;
                case 5: this._red = v; this._green = p; this._blue = q; break;
            }
            this.rgbChange(Source.SV);
        }
    }

    private rgbChange(source: Source) {
        this._red = Math.floor(this._red + 0.5);
        this._green = Math.floor(this._green + 0.5);
        this._blue = Math.floor(this._blue + 0.5);
        let r = this._red,
            g = this._green,
            b = this._blue,
            min = Math.min(r, g, b)/255,
            max = Math.max(r, g, b)/255;
        if(source !== Source.Hex) {
            this._hex = r.toString(16).padStart(2,"0")
                + g.toString(16).padStart(2,"0")
                + b.toString(16).padStart(2,"0");
        }
        r /= 255; g /= 255; b /= 255;
        if(source !== Source.Hue && source !== Source.SL && source !== Source.SV) {
            this._hue = (max === min)
                ? 0
                : (max === r)
                    ? (g > b)
                        ? 60 * (g - b) / (max - min)
                        : 60 * (g - b) / (max - min) + 360
                    : (max === g)
                        ? 60 * (b - r) / (max - min) + 120
                        : 60 * (r - g) / (max - min) + 240;
        }
        if(source !== Source.SL && source !== Source.Hue ) {
            this._lHSL = (max + min) / 2;
            this._sHSL = (this._lHSL === 0 || max === min)
                ? 0
                : (this._lHSL > 0.5)
                    ? (max - min) / (2 - 2 * this._lHSL)
                    : (max - min) / 2 / this._lHSL;
        }
        if(source !== Source.SV && source !== Source.Hue) {
            this._vHSV = max;
            this._sHSV = (max === 0)
                ? 0
                : 1 - min / max;
        }
        this._hue = Math.floor(this._hue);
        this._sHSL = Math.floor(this._sHSL * 100 + 0.5) / 100;
        this._lHSL = Math.floor(this._lHSL * 100 + 0.5) / 100;
        this._sHSV = Math.floor(this._sHSV * 100 + 0.5) / 100;
        this._vHSV = Math.floor(this._vHSV * 100 + 0.5) / 100;
        this.calculating = false;
    }
}

export default Main
