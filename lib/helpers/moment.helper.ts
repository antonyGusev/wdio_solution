import moment from 'moment';

enum MomentFormats {
  day_num_time_with_miliseconds = 'MMM Do hh:mm:ss.SSS',
  month_dayNumber_year = 'MMM DD, YYYY',
  month_dayNumber = 'MMM DD',
}

class Moment {
  toISOString(date?: string) {
    return moment(date).toISOString()
  }

  now(format: MomentFormats = MomentFormats.month_dayNumber_year) {
    return moment().format(format);
  }

  substructYears(number: number, format?: MomentFormats) {
    return moment()
      .subtract(number, 'years')
      .format(format || MomentFormats.month_dayNumber_year);
  }

  substructMonths(number: number, format?: MomentFormats) {
    return moment()
      .subtract(number, 'month')
      .format(format || MomentFormats.month_dayNumber);
  }

  substructMonthsFrom(number: number, date: Date, format?: MomentFormats) {
    return moment(date)
      .subtract(number, 'month')
      .format(format || MomentFormats.month_dayNumber);
  }

  monthsDiff(begin: string, finish: string) {
    const startDate = moment(new Date(begin));
    const endDate = moment(new Date(finish));

    return Math.round(endDate.diff(startDate, 'month', true));
  }

  lastDayOfPreviousMonth(format: MomentFormats = MomentFormats.month_dayNumber) {
    const toDay = this.now();
    return moment(toDay).subtract(1,'months').endOf('month').format(format);
  }

  yearBeginning(format: MomentFormats = MomentFormats.month_dayNumber) {
    return moment().startOf('year').format(format);
  }
}

const myMoment = new Moment();

export {myMoment, MomentFormats};
