import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export default function Player({
  name,
  votes = 0,
  setVotes = () => {},
  updating = false,
}) {
  function handleClick() {
    setVotes(votes + 1);
    console.log("votes", votes);
  }

  return (
    <>
      <div>
        {name || "John"}{" "}
        <label>
          Votes : <output>{votes}</output>
        </label>
        {"  "}
        <Button
          onClick={handleClick}
          disabled={updating}
          variant="outline-secondary"
        >
          👍
        </Button>
      </div>
    </>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  votes: PropTypes.number,
  setVotes: PropTypes.func,
  updating: PropTypes.bool,
};
