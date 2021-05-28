import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { LogEntity } from './log-entity';
import { Timestamp } from './timestamp';

describe('Timestamp', () => {
  it('should create an instance', () => {
    expect(new Timestamp(new Date())).toBeTruthy();
  });

  fit('calculate time difference in hours and min', () => {
    // Arrange
    var date = new Date("2019-11-10 10:00");
    var timestamp = new Timestamp(date);
    var date2 = new Date("2019-11-10 11:10");
    var timestamp2 = new Timestamp(date2);

    // Act
    let restult: string = timestamp.diff(timestamp2);

    // Assert
    expect(restult).toBe("1 h 10 min");
  })

  fit('calculate time diff over the houre', () => {
    // Arrange
    var date = new Date("2019-11-10 07:58");
    var timestamp = new Timestamp(date);
    var date2 = new Date("2019-11-10 08:04");
    var timestamp2 = new Timestamp(date2);

    // Act
    let result: string = timestamp.diff(timestamp2);
    // Assert
    expect(result).toBe("0 h 6 min");
  })

  fit('calculate time diff over the houre', () => {
    // Arrange
    var date = new Date("2019-11-10 07:08");
    var timestamp = new Timestamp(date);
    var date2 = new Date("2019-11-10 08:04");
    var timestamp2 = new Timestamp(date2);

    // Act
    let result: string = timestamp.diff(timestamp2);
    // Assert
    expect(result).toBe("0 h 56 min");
  })

  fit('calculate time diff over the houre', () => {
    // Arrange
    var date = new Date("2019-11-10 05:58");
    var timestamp = new Timestamp(date);
    var date2 = new Date("2019-11-10 08:04");
    var timestamp2 = new Timestamp(date2);

    // Act
    let result: string = timestamp.diff(timestamp2);
    // Assert
    expect(result).toBe("2 h 6 min");
  })

  fit('calculate worktime without breaks', () => {
    // Arrange
    var logEntryList: LogEntity[] = [];
    logEntryList.push({ timestamp: "2019-11-10 05:58", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 07:04", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 08:04", activity: "work" });

    // Act
    let result: string = Timestamp.calcWorkTime(logEntryList);

    // Assert
    expect(result).toBe("2 h 6 min");
  })

  fit('calculate worktime with breaks', () => {
    // Arrange
    var logEntryList: LogEntity[] = [];
    logEntryList.push({ timestamp: "2019-11-10 05:58", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 07:04", activity: "no work**" });
    logEntryList.push({ timestamp: "2019-11-10 08:05", activity: "work" });

    // Act
    let result: string = Timestamp.calcWorkTime(logEntryList);

    // Assert
    expect(result).toBe("1 h 1 min");
  })

  fit('calculate slacking time without breaks', () => {
    // Arrange
    var logEntryList: LogEntity[] = [];
    logEntryList.push({ timestamp: "2019-11-10 05:58", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 07:04", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 08:04", activity: "work" });

    // Act
    let result: string = Timestamp.calculateSlackingTime(logEntryList);

    // Assert
    expect(result).toBe("0 h 0 min");
  })

  fit('calculate slacking time with breaks', () => {
    // Arrange
    var logEntryList: LogEntity[] = [];
    logEntryList.push({ timestamp: "2019-11-10 05:58", activity: "work" });
    logEntryList.push({ timestamp: "2019-11-10 07:04", activity: "no work**" });
    logEntryList.push({ timestamp: "2019-11-10 08:05", activity: "work" });

    // Act
    let result: string = Timestamp.calculateSlackingTime(logEntryList);

    // Assert
    expect(result).toBe("1 h 6 min");
  })
});
