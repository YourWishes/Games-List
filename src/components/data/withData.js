import React from 'react';
import { parse } from 'papaparse';

export const withData = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        loaded: false,
        error: undefined,
        data: undefined
      }
    }

    componentDidMount() {
      this.load();
    }

    async load() {
      this.setState({ loading: true, loaded: false, error: null });

      try {
        let dataRaw = await fetch(`${process.env.PUBLIC_URL}/data.csv`);
        let dataText = await dataRaw.text();

        let { data } = parse(dataText, { header: true });
        this.setState({ loading: false, loaded: true, data });
      } catch(e) {
        this.setState({ loading: false, loaded: true, error: e })
      }
    }

    render() {
      
      return <Component {...this.state} />
    }
  }
}