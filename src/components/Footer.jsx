import React from 'react'

const Footer = () => {
  return (
    <section className="text-center px-4 sm:px-10 py-6">
      <h4 className="text-2xl">Follow Robinos & Mino NFT on</h4>
      
      <section className="flex items-center justify-center gap-4 sm:gap-10 pt-6 pb-12">
        <a href="https://twitter.com/RobinosPredict" target="_blank" title='Robinos Prediction Twitter' rel="noreferrer" className="text-2xl">
          <i className="fab fa-twitter"></i>

          <h6 className="text-xxxs leading-tight">Robinos Twitter</h6>
        </a>
        
        <a href="https://twitter.com/MinoSportsNFT" target="_blank" title='Mino NFT Twitter' rel="noreferrer" className="text-2xl">
          <i className="fab fa-twitter"></i>

          <h6 className="text-xxxs leading-tight">Mino Twitter</h6>
        </a>
        
        <a href="https://discord.com/invite/uvbjt5tR4X" target="_blank" title='Mino NFT Twitter' rel="noreferrer" className="text-2xl">
          <i className="fab fa-discord"></i>

          <h6 className="text-xxxs leading-tight">Robinos discord</h6>
        </a>
        
        <a href="https://robinos.gitbook.io/robinos-tokenized-prediction-utility-platform/" target="_blank" title='Mino NFT Twitter' rel="noreferrer" className="text-2xl">
          <i className="fas fa-scroll"></i>

          <h6 className="text-xxxs leading-tight">Robinos docs</h6>
        </a>
      </section>

      <h6 className="text-xs">Robinos Prediction &copy; 2022</h6>
    </section>
  )
}

export default Footer