import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import ShareDB from '../../components/sharedb';
import Binding from '../../components/sharedb/binding';
import AppContext from '../../context/appcontext';
import './Captioning.css';

const onConnect = () => {
  alert('connected!');
};

const onDisconnect = () => {
  alert('disconnected!');
};

const share = new ShareDB(onConnect, onDisconnect);

const Captioning = ({ match }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    let document;
    let binding;
    let timer;

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
  }, [match.params.user, match.params.job]);

  return (
    <AppContext.Consumer>
      {context => {
        console.log(context);
        return (
          <div
            className="captions"
            style={{
              // '-webkit-app-region': 'drag',
              backgroundColor: context.backgroundColor,
              color: context.color,
              fontFamily: context.fontFamily || 'Courier, monospace',
              fontSize: context.fontSize || '18px',
            }}
          >
            <span style={{ backgroundColor: context.textBg }}>
              {text || ''}
            </span>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

Captioning.propTypes = {};

export default Captioning;
