import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { useState } from "react";
export default function PlayerCreateForm({ onSubmit }) {
  // controlled components

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [likes, setLikes] = useState(0);

  console.log("🧑‍🎨 PlayerCreateForm render", { name, email, likes });
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Likes</Form.Label>
        <Form.Control
          type="number"
          name="likes"
          value={likes}
          onChange={(e) => setLikes(+e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

PlayerCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
