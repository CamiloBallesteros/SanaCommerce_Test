function About() {
  return (
      <div className="container-fluid mt-3 mx-2 d-flex">
          <div className="col-6 offset-1 rounded d-flex flex-wrap align-content-start p-3 mt-5" id="homeContainer" style={{ minHeight: "70vh" }}>
              <h2 className="col-12 mb-4">About Us</h2>
              <hr />
              <div className="row">
                  <div className="col-6">
                      <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget efficitur mi. Duis maximus risus id neque convallis vehicula. Suspendisse egestas congue sem, ut consequat nibh. Proin commodo ex quis nunc tristique, quis ultrices turpis venenatis. Etiam posuere risus et ornare sodales. Aliquam id enim nulla. Suspendisse congue sagittis odio, in venenatis quam rutrum quis. Nullam et lorem viverra diam tempor ultricies. Praesent quis urna vitae velit convallis venenatis eget quis justo.</p>
                  </div>
                  <div className="col-6">
                      <p style={{ textAlign: "justify" }}>Nulla scelerisque sapien id pulvinar eleifend. Praesent molestie ex ac nibh aliquet aliquet. Curabitur porttitor pulvinar nisl, sed blandit nisi ullamcorper tincidunt. Nullam et maximus est. Vestibulum id ornare libero. Aliquam fringilla velit eu libero pulvinar, ut suscipit arcu commodo. Morbi ut tellus sit amet ante placerat luctus. Pellentesque a convallis orci, sed aliquet ipsum. Aenean vitae tincidunt urna, vitae aliquet lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default About;