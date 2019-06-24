import {NgModule} from "@angular/core";
import {DateFormatPipe, KeysPipe} from "./pipe";


@NgModule({
  imports: [],
  exports: [DateFormatPipe, KeysPipe],
  declarations: [DateFormatPipe, KeysPipe],
  providers: []
})
export class UtilitiesModule {}
