export class NumberDictionary<V> {

  _keys: number[] = new Array<number>();

  get(key: number) : V {
    return (this.containsKey(key)) ? this[key] : undefined;
  }

  add(key: number, value: V) {
    this[key] = value;
    this._keys.push(key);
  }

  remove(key: number) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    delete this[key];
  }

  keys(): number[] {
    return this._keys;
  }

  containsKey(key: number) {
    if (typeof this[key] === "undefined") {
      return false;
    }
    return true;
  }
}

export class StringDictionary<V> {

  _keys: string[] = new Array<string>();

  get(key: string) : V {
    return (this.containsKey(key)) ? this[key] : undefined;
  }

  add(key: string, value: V) {
    this[key] = value;
    this._keys.push(key);
  }

  remove(key: string) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    delete this[key];
  }

  keys(): string[] {
    return this._keys;
  }

  containsKey(key: string) {
    if (typeof this[key] === "undefined") {
      return false;
    }
    return true;
  }
}
