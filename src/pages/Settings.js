import React, { Component } from 'react';

export default class Settings extends Component {
  buttonStyleStandard = `mt-2 mb-1 h-12 ml-24 drop-shadow-xl
   rounded-[32px] bg-white w-[100px]
   focus:ring hover:scale-105 ease-in shadow-lg hover:shadow-blue-500/50 bg-green-300 
    m-auto 
   `;

  render() {
    return (
      <div
        className="bg-white w-[600px] h-[650px] absolute left-[33%]
       top-[10%] rounded-xl"
      >
        <h2
          data-testid="settings-title"
          className="mt-10 ml-24 text-[36px]
         font-bold text-stone-500"
        >
          Configuraćões
        </h2>
        <img
          src="https://davesamaniego2016.files.wordpress.com/2016/10/cat-catstruction-play-on-words-construction-cats-favim-com-4174852.jpeg"
          alt=""
          className="w-[400px] m-auto mt-4 rounded-[30px]"
        />
        <button type="button" onClick={ () => { this.props.history.push('/'); } } className={ this.buttonStyleStandard }>Voltar</button>

      </div>
    );
  }
}
