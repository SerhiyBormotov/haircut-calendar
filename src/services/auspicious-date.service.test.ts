import {
  AuspiciousDateService,
  ConditionType,
  ICondition,
} from "./auspicious-date.service";

describe("constructConditionString", () => {
  let service: AuspiciousDateService;

  beforeEach(() => {
    service = new AuspiciousDateService();
  });
  it("should work with 2 conditions of different types", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 12) },
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 10) },
    ];

    expect(service.constructConditionString(conditions)).toBe(
      "після 10:00 - до 12:00",
    );
  });

  it("should work with 2 conditions of the type BEFORE", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 15) },
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 10) },
    ];

    expect(service.constructConditionString(conditions)).toBe("до 10:00");
  });

  it("should work with 2 conditions of the type AFTER", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 12) },
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 8) },
    ];

    expect(service.constructConditionString(conditions)).toBe("після 12:00");
  });

  it("should throw error when there is no conditions intersection", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 15) },
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 12) },
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 8) },
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 10) },
    ];

    expect(() => {
      service.constructConditionString(conditions);
    }).toThrow();
  });

  it("should work with 1 condition", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.AFTER, date: new Date(2014, 0, 2, 12) },
    ];

    expect(service.constructConditionString(conditions)).toBe("після 12:00");
  });

  it("should ignore unvaluable conditions", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.CURRENT_ONLY },
      { type: ConditionType.NEXT_ONLY },
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 12) },
    ];

    expect(service.constructConditionString(conditions)).toBe("до 12:00");
  });

  it("should ignore undefined conditions", () => {
    const conditions: ICondition[] = [
      undefined,
      { type: ConditionType.BEFORE, date: new Date(2014, 0, 2, 12) },
    ];

    expect(service.constructConditionString(conditions)).toBe("до 12:00");
  });

  it("should return empty string with no valuable conditions", () => {
    const conditions: ICondition[] = [
      { type: ConditionType.CURRENT_ONLY },
      { type: ConditionType.NEXT_ONLY },
    ];

    expect(service.constructConditionString(conditions)).toBe("");
  });
});
