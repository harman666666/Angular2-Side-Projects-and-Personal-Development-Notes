/* tslint:disable:one-line:check-open-brace*/
import { Injectable }    from '@angular/core';

import { LoggerService } from './logger.service';

// class used as a restricting interface (hides other public members)
export abstract class MinimalLogger {
  logInfo: (msg: string) => void;
  logs: string[];
}

/*
// Transpiles to:
  var MinimalLogger = (function () {
    function MinimalLogger() {}
    return MinimalLogger;
  }());
  exports("MinimalLogger", MinimalLogger);
 */

@Injectable()
export class DateLoggerService extends LoggerService implements MinimalLogger
{
  logInfo(msg: any)  { super.logInfo(stamp(msg)); }
  logDebug(msg: any) { super.logInfo(stamp(msg)); }
  logError(msg: any) { super.logError(stamp(msg)); }
}

function stamp(msg: any) { return msg + ' at ' + new Date(); }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/