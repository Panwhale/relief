import React from 'react';

const WORDS = `Ishmael travels in December from Manhattan Island to New Bedford, Massachusetts 
with plans to sign up for a whaling voyage. The inn where he arrives is overcrowded, so he must 
share a bed with the tattooed cannibal Polynesian Queequeg, a harpooneer whose father was king of 
the fictional island of Rokovoko. The next morning, Ishmael and Queequeg attend Father Mapple's 
sermon on Jonah, then head for Nantucket. Ishmael signs up with the Quaker ship-owners Bildad and 
Peleg for a voyage on their whaler Pequod. Peleg describes Captain Ahab: "He's a grand, ungodly, 
god-like man" who nevertheless "has his humanities". They hire Queequeg the following morning. 
A man named Elijah prophesies a dire fate should Ishmael and Queequeg join Ahab. While provisions 
are loaded, shadowy figures board the ship. On a cold Christmas Day, the Pequod leaves the harbor.
Ishmael discusses cetology (the zoological classification and natural history of the whale), and 
describes the crew members. The chief mate is 30-year-old Starbuck, a Nantucket Quaker with a 
realist mentality, whose harpooneer is Queequeg; second mate is Stubb, from Cape Cod, happy-go-lucky 
and cheerful, whose harpooneer is Tashtego, a proud, pure-blooded Indian from Gay Head, and the 
third mate is Flask, also from Martha's Vineyard, short, stout, whose harpooneer is Daggoo, a 
tall African, now a resident of Nantucket. When Ahab finally appears on the quarterdeck, he 
announces he is out for revenge on the white whale which took one leg from the knee down and left 
him with a prosthesis fashioned from a whale's jawbone. Ahab will give the first man to sight Moby
Dick a doubloon, a gold coin, which he nails to the mast. Starbuck objects that he has not come for
vengeance but for profit. Ahab's purpose exercises a mysterious spell on Ishmael: "Ahab's quenchless 
feud seemed mine". Instead of rounding Cape Horn, Ahab heads for the equatorial Pacific Ocean via 
southern Africa. One afternoon, as Ishmael and Queequeg are weaving a mat — "its warp seemed necessity, 
his hand free will, and Queequeg's sword chance" — Tashtego sights a sperm whale. Five previously 
unknown men appear on deck and are revealed to be a special crew selected by Ahab and explain the 
shadowy figures seen boarding the ship. Their leader, Fedallah, a Parsee, is Ahab's harpooneer. 
The pursuit is unsuccessful.`.split(' ');

const style = {
  input: {
    width: '400px',
    padding: '5px 8px',
    fontSize: '1.6rem',
  },
  wordFail: {
    color: 'red',
  },
  wordSuccess: {
    color: 'green',
  },
  wordNeutral: {
    color: 'black',
  },
};

const successStorage = [];

class Typing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineStart: 0,
      index: 0,
      countDown: 60,
      inputWord: '',
      start: false,
      skip: false,
    };
    this.start = this.start.bind(this);
    this.onChange = this.onChange.bind(this);
    this.count = this.count.bind(this);
    this.checkOnSpace = this.checkOnSpace.bind(this);
    this.keystrokeEventListener = this.keystrokeEventListener.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keystrokeEventListener.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keystrokeEventListener.bind(this));
  }

  onChange(event) {
    const {
      start,
      skip,
    } = this.state;
    if (skip) return this.setState({ skip: false });
    this.setState({
      inputWord: event.target.value,
    });
    if (!start) this.start();
    return true;
  }

  keystrokeEventListener(event) {
    const active = document.activeElement.id;
    if (event.key === ' ' && active === 'inputBox') {
      this.checkOnSpace();
    }
  }

  checkOnSpace() {
    const {
      index,
      inputWord,
      lineStart,
    } = this.state;
    if (WORDS[index] === inputWord) {
      console.log('pushed true');
      successStorage.push(true);
    } else {
      console.log('pushed false');
      successStorage.push(false);
    }
    if ((index + 1) % 10 === 0) {
      this.setState({
        inputWord: '',
        index: index + 1,
        skip: true,
        lineStart: lineStart + 10,
      });
    }
    this.setState({
      inputWord: '',
      index: index + 1,
      skip: true,
    });
  }

  count() {
    this.setState((prevState) => ({
      ...prevState,
      countDown: prevState.countDown - 1,
    }));
  }

  start() {
    const intervalId = setInterval(this.count.bind(this), 1000);
    this.setState({
      start: true,
    });
    setTimeout(() => {
      clearInterval(intervalId);
      const accuracy = successStorage
        .reduce((acc, curr) => {
          if (curr) return acc + 1;
          return acc;
        }, 0) / successStorage.length;
      const wpm = successStorage.length;
    }, 60000);
  }

  render() {
    const {
      inputWord,
      countDown,
      lineStart,
      index,
    } = this.state;
    return (
      <div id="typing-app">
        <div>
          <div className="first-line">
            {
              WORDS.slice(lineStart, lineStart + 10).map((word, i) => {
                const status = lineStart + i >= index ? undefined : successStorage[lineStart + i];
                let finalStyle;
                if (status === undefined) finalStyle = style.wordNeutral;
                else finalStyle = status ? style.wordSuccess : style.wordFail;
                return (
                  <span key={Math.random() * 1000} style={finalStyle}>{`${word} `}</span>
                );
              })
            }
          </div>
          <div className="second-line">{WORDS.slice(lineStart + 10, lineStart + 20).join(' ')}</div>
        </div>
        <div>
          <input id="inputBox" value={inputWord} onChange={this.onChange} placeholder="enter word..." style={style.input} />
          <div>{countDown}</div>
        </div>
      </div>
    );
  }
}

export default Typing;
