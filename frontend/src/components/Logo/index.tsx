function Logo(props: { style?: React.CSSProperties }) {
  return (
    <div
      // TODO: make this look like a Logo at least ...
      style={{
        ...props.style, // Style the size in the calling component
        backgroundColor: "blueviolet",
        borderRadius: "50%",
        color: "whitesmoke",
        display: "flex",
      }}
    >
      <span
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          verticalAlign: "center",
          textAlign: "center",
          fontSize: 30,
          fontFamily: "cursive",
        }}
      >
        AS
      </span>
    </div>
  );
}

export default Logo;
