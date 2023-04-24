import Logo from "@/components/Logo/index";

// TODO: decide if want it as Frame or TopBar
function Frame() {
  return (
    <>
      {/* TODO: style */}
      <div
        style={{
          width: "100vw",
          height: "10vh",
          backgroundColor: "LightBlue",
          display: "flex",
          flexDirection: "row",
          verticalAlign: "center",
        }}
      >
        <div>
          {/* TODO: style the Logo, etc. size */}
          <Logo style={{ height: "10vh", width: "10vh" }} />
        </div>
        <div style={{display: "flex", flexDirection: "row", verticalAlign: "center", justifyContent: "center"}}>
          {/* TODO: List of links to each subpage (TODO: think) */}
          <div>Accreditation</div>
          <div>Certificate</div>
          <div>Issuer</div>
          <div>Applicant</div>
          <div>Search</div>
        </div>
      </div>
    </>
  );
}

export default Frame;
