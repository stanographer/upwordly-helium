import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import ShareDB from '../../components/sharedb';
import Binding from '../../components/sharedb/binding';
import './Captioning.css';

const onConnect = () => {
  alert('connected!');
};

const onDisconnect = () => {
  alert('disconnected!');
};

const share = new ShareDB(onConnect, onDisconnect);

const Captioning = ({ location, match }) => {
  const [text, setText] = useState('');
  const [styleProps, setStyleProps] = useState({});

  useEffect(() => {
    console.log('location', location);
    console.log('match', match);
    let document;
    let binding;
    let timer;

    const assignStyles = () => {
      if (location && location.search) {
        const queries = location.search.split('?')[1].split('&');
        let styles = {};

        for (let i = 0; i < queries.length; i += 1) {
          const props = queries[i].split('=');

          styles = {
            ...styles,
            [props[0]]: props[1],
          };
        }

        return setStyleProps(styles);
      }
    };

    assignStyles();

    share.connect('wss://upword.ly/ws').then(() => {
      share.getDoc(match.params.user, match.params.job).then(doc => {
        console.log(doc);
        document = doc;

        doc.subscribe(err => {
          if (err) {
            return setText(`There was a connection error: ${err}`);
          }
        });

        doc.on('load', () => {
          binding = new Binding(doc.data, '≈');

          setTimeout(() => {
            setText(binding.snapshot || 'Connection successful.');
          }, 0);

          timer = setInterval(() => scroll.scrollToBottom(), 500);
        });

        doc.on('op', op => {
          requestAnimationFrame(() => setText(binding.applyOp(op)));
        });
      });
    });

    // Destroy listeners.
    return () => {
      document.unsubscribe();
      document.destroy();
      clearInterval(timer);
    };
  }, [location, match]);

  return (
    <div
      className="captions"
      style={{
        '-webkit-app-region': 'drag',
        backgroundColor: `#${styleProps.backgroundColor}` || 'transparent',
        color: `#${styleProps.color}` || '#fffce1',
        fontFamily: `#${styleProps.fontFamily}` || 'Courier New, monospace',
        fontSize: `${styleProps.fontSize}pt` || '20pt',
        '-webkit-text-stroke-width':
          `${styleProps.textOutlineWidth}px` || '0px',
        '-webkit-text-stroke-color':
          `#${styleProps.textOutlineColor}` || '#000',
      }}
    >
      <span
        style={{
          backgroundColor: styleProps.textBg || 'rgb(30,34,39)',
        }}
      >
        {text || ''}
      </span>
    </div>
  );
};

Captioning.propTypes = {};

export default Captioning;
