import { isGeneratedFile } from '@angular/compiler/src/aot/util';
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
});
