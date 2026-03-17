const CoinDescription = ({ coin }) => {
  return (
    <div className="detail-container whitespace-break-spaces">
      {coin.description.en}
    </div>
  );
};

export default CoinDescription;
