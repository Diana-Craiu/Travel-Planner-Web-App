import React, { Component } from "react";

// interfata pentru proprietatile componentei
interface Props {
  onDurationChange: (duration: number) => void;
}

// interfata pentru starea componentei
interface State {
  startDate: string;
  endDate: string;
  duration: number;
}

// clasa care calculeaza durata dintre doua date
class DateRangeCalculator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      duration: 0,
    };
  }

  //gestionarea schimbarii datei de inceput
  handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = event.target.value;
    this.setState({ startDate }, () => this.calculateDuration());
  };
  //gestionarea schimbarii datei de sfarsit
  handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = event.target.value;
    this.setState({ endDate }, () => this.calculateDuration());
  };

  // calcularea duratei dintre doua date
  calculateDuration = () => {
    const { startDate, endDate } = this.state;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    this.setState({ duration }, () => {
      this.props.onDurationChange(duration);
    });
  };

  render() {
    const { startDate, endDate, duration } = this.state;
    return (
      <section className="text" id="customSection2">
        <form>
          <label htmlFor="plecare">Alegeți data de plecare:&nbsp;</label>
          <input
            type="date"
            id="plecare"
            name="plecare"
            value={startDate}
            onChange={this.handleStartDateChange}
          />
        </form>
        <form>
          <label htmlFor="sosire">Alegeți data de întoarcere:&nbsp;</label>
          <input
            type="date"
            id="sosire"
            name="sosire"
            value={endDate}
            onChange={this.handleEndDateChange}
          />
        </form>
        <br />
        <div className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Durata"
            name="durata"
            id="durata"
            value={duration.toString()}
            readOnly
            required
          />
          <label htmlFor="durata" className="form__label">
            Durata (zile)
          </label>
        </div>
        <br />
      </section>
    );
  }
}

export default DateRangeCalculator;
