import Fetch from "isomorphic-unfetch";

const Index = props => {
  return (
    <div>
      {console.log(props.bpi)}
      <p>Hello Next.js</p>
      <p>You have visited this site {props.bpi.counts} times </p>
    </div>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch("http://localhost:5000/");
  const data = await res.json();

  return {
    bpi: data
  };
};

export default Index;
