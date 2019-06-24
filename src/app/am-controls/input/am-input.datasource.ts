
export interface IAmSelectDataSource {
  ajaxOptions: {};
  setDataProcessor(processor: (data:any) => {});
}

export class AmSelectDataSource implements IAmSelectDataSource {
  private _internalProcessor: (data:any) => {};

  constructor(private url: string, private delay: number) {
    this._internalProcessor = (data:any) => {
      return {
        results: data
      };
    };
  }

  get ajaxOptions() : {} {
    return {
      url: this.url,
      delay: this.delay,
      processResults: this._internalProcessor
    };
  }

  setDataProcessor(processor: (data:any) => {}) {
    this._internalProcessor = processor;
  }

}
