import React from "react"
import ReactDOM from 'react-dom';
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Scroller from "../components/scroller"
import PortfolioModal from "../components/portfolio/modal"
import PortfolioCarousel from "../components/portfolio/carousel"

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    Scroller.handleAnchorScroll = Scroller.handleAnchorScroll.bind(this)
    this.state = {
      modalShow: false,
      modalCurrent: 0
    }
    this.redirectToCheckout = this.redirectToCheckout.bind(this);
    this.handlePortfolioClick = this.handlePortfolioClick.bind(this);
    this.setModal = this.setModal.bind(this);
    this.state = { fname: "", lname: "", email: "", address: "" , postalcode: "", country: ""};

  }

  componentDidMount() {
    this.stripe = window.Stripe("pk_test_hI9XDKfEBryGNeasJyFK0Vlj00RgxD7uI2")
  }

  async redirectToCheckout(event) {
    event.preventDefault()
    const { error } = await this.stripe.redirectToCheckout({
      items: [{ sku: "sku_FjpF5383lsXy99", quantity: 1 }],
      successUrl: `https://smartsupplements.ca/thankyou`,
      cancelUrl: `https://smartsupplements.ca`,
    })

    if (error) {
      console.warn("Error:", error)
    }
  }

  handlePortfolioClick(index, e) {
    e.preventDefault();
    this.setModal(true, index);
  }

  setModal(isShown, current) {
    this.setState({
      modalShow: isShown,
      modalCurrent: current
    });
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { fname, lname, email, address, postalcode, country } = this.state;
    return (
      <Layout>
        <SEO title="Herbicare|Cognisense"/>
        <section className="page-section bg-primary" id="discover">
          <div className="container">
          <Img
                fluid={this.props.data.singleimage.childImageSharp.fluid}
                alt=""
          />
            <div className="row justify-content-center">
             
              <div className="col-lg-8 text-center">
                <br></br>
                <h2 className="text-white mt-0">Discover CogniSense™</h2>
                <hr className="divider light my-4"/>
                <p className="text-white-50 mb-4">Cognizance is defined as knowledge, attention, awareness and CogniSense™ has been designed to deliver that and more. It contains a blend of eleven clinically studied ingredients with published medical literature to supply the brain with focus, energy, and improved cognition. Its short-term effects include stimulation, wakefulness, and concentration with added long-term benefits of augmented brain health, healthier blood flow and improved memory for double the impact. Unlike coffee and energy drinks, CogniSense™ supplementation does not follow a state of depletion and drowsiness. Coffee and energy drinks are known to cause anxiety and nervousness in certain individuals whilst CogniSense™ reduces anxiety and stress allowing relaxed and focused mental ability to tackle challenging tasks. In fact, its long-term benefits continue to accumulate to increase mental health, learning ability, memory, and recall. It enhances mental performance by improving blood flow and enriching the effects of neurotransmitters readily available in the brain, neurotransmitters which will enhance and make communication between brain cells more efficient enabling fluent thought formation and creativity. CogniSense™ is a well-rounded effort to relieve stress and anxiety while promoting happiness, focus, attention, learning abilities, and memory.</p>
                <a className="btn btn-light btn-xl js-scroll-trigger" href="#services"
                   onClick={Scroller.handleAnchorScroll}>Read Research!</a>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section" id="services">
          <div className="container">
            <h2 className="text-center mt-0">Developed with Care</h2>
            <hr className="divider my-4"/>
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  
                  <img src={require('../images/leaf.png')} alt="leaf"/>
                  <h3 className="h4 mb-2">Engineered by Nature</h3>
                  <p className="text-muted mb-0">Blended from natural herbs</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <img src={require('../images/stetho.png')} alt="stetho"/>
                  <h3 className="h4 mb-2">Clinically studied ingredients</h3>
                  <p className="text-muted mb-0">Developed by doctors</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <img src={require('../images/mem.png')} alt="mem"/>
                  <h3 className="h4 mb-2">Proven to improve Memory</h3>
                  <p className="text-muted mb-0">Improves test-taking abilities</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <img src={require('../images/gear.png')} alt="gear"/>
                  <h3 className="h4 mb-2">Sharpens the Mind</h3>
                  <p className="text-muted mb-0">Promotes blood flow, Tackles anxiety, Enhances cognition</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio">
          <div className="container-fluid p-0">
            <div className="row no-gutters">
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/1.png" onClick={this.handlePortfolioClick.bind(this, 0)}>
                  <Img fluid={this.props.data.images.edges[0].node.childImageSharp.fluid}/>
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">
                      Herbs and Nutrients for the Mind: Natural Brain Enhancers
                    </div>
                    <div className="project-name">
                      Huperzine A inhibits the breakdown of the neurotransmitter acetylcholine by the enzyme acetylcholinesterase, working as a cognitive enhancer for improving memory and concentration.
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/2.jpg" onClick={this.handlePortfolioClick.bind(this, 1)}>
                  <Img fluid={this.props.data.images.edges[1].node.childImageSharp.fluid}/>
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">
                      Epinephrine Enhancement of Human Memory Consolidation: Interaction with Arousal at Encoding
                    </div>
                    <div className="project-name">
                      Norepinephrine increases arousal and alertness, promotes vigilance, enhances formation and retrieval of memory, and focuses attention. Hormones such as epinephrine, can produce retrograde enhancement of long-term memory in humans.
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="img/portfolio/fullsize/3.jpg" onClick={this.handlePortfolioClick.bind(this, 2)}>
                  <Img fluid={this.props.data.images.edges[2].node.childImageSharp.fluid}/>
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">
                     PET, Infrared Spectroscopy and Transcranial Doppler Methods on Neuroprotective Drug Vinpocetine: A Summary of Evidences
                    </div>
                    <div className="project-name">
                      Taking vinpocetine along with ginkgo also appears to improve short-term memory in healthy adults. vinpocetine might improve blood flow to the brain, it is used for enhancing memory and preventing Alzheimer’s disease and other conditions that harm learning, memory, and information processing skills as people age.
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href="images/portfolio/fullsize/4.jpg" onClick={this.handlePortfolioClick.bind(this, 3)}>
                  <Img fluid={this.props.data.images.edges[3].node.childImageSharp.fluid}/>
                  <div className="portfolio-box-caption">
                    <div className="project-category text-white-50">
                      L-Theanine Improves Memory and Attention in Subjects with Mild Cognitive Impairment: A Double-Blind Placebo-Controlled Study
                    </div>
                    <div className="project-name">
                     Able to cross the blood–brain barrier, theanine has reported psychoactive properties. Theanine has been studied for its potential ability to reduce mental and physical stress, improve cognition, and boost mood and cognitive performance in a synergistic manner with caffeine.
                    </div>
                  </div>
                </a>
              </div>
              
            </div>
          </div>
        </section>
        
        <section className="page-section bg-dark text-white">
          <div className="container text-center">
            <h2 className="mb-4">Buy Cognisense!</h2>
            <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <div className="card-block">
                            <form onSubmit={this.handleSubmit} className="k-form" name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                              <input type="hidden" name="form-name" value="contact" />
                                <fieldset>
                                    <legend>User Details</legend>

                                    <label className="k-form-field">
                                        <span>First Name</span>
                                        <input type="text" className="k-textbox" placeholder="Your Name" name="fname" value={fname} onChange={this.handleChange} />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Last Name</span>
                                        <input type="text" className="k-textbox" placeholder="Your Last Name"  name="lname" value={lname} onChange={this.handleChange}/>
                                    </label>

                                    <label className="k-form-field">
                                        <span>Email <span className="k-required">*</span></span>
                                        <input type="email" className="k-textbox" placeholder="Your Email"  name="email" value={email} onChange={this.handleChange}/>
                                    </label>

                                </fieldset>

                                <fieldset>
                                    <legend>Shipping Address</legend>
                                    <label className="k-form-field">
                                        <span>Address</span>
                                        <input type="text" className="k-textbox" placeholder="Your Address"  name="address" value={address} onChange={this.handleChange}/>
                                    </label>
                                    <label className="k-form-field">
                                        <span>Postal Code</span>
                                        <input type="text" className="k-textbox" placeholder="Your Postal Code" name="postalcode" value={postalcode} onChange={this.handleChange}/>
                                    </label>
                                    <label className="k-form-field">
                                        <span>Country</span>
                                        <input type="text" className="k-textbox" placeholder="Your Country" name="country" value={country} onChange={this.handleChange}/>
                                    </label>
                                </fieldset>
                              <button type="submit" onClick={event => this.redirectToCheckout(event)} className="btn btn-primary btn-xl">Order Now!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        

        <section className="page-section" id="contact">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider my-4"/>
                <p className="text-muted mb-5">Have any questions about our product? Give us a call or send us an
                  email
                  and we will get back to you as soon as possible!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                <div>+1 (416) 786-7578</div>
              </div>
              <div className="col-lg-4 mr-auto text-center">
                <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
                <a className="d-block" href="mailto:contact@yourwebsite.com">herbicaresupport@gmail.com</a>
              </div>
            </div>
          </div>
        </section>
        <PortfolioModal show={this.state.modalShow} onHide={() => this.setModal(false, 0)}>
          <PortfolioCarousel images={this.props.data.images.edges} current={this.state.modalCurrent}/>
        </PortfolioModal>
      </Layout>
    )
  }
}

//ReactDOM.render(<IndexPage/>, document.getElementById("root"));

export const imageData = graphql`
  query {
    images: allFile(filter: {relativePath: {glob: "portfolio/fullsize/*.jpg"}}, sort: {fields: name}) {
      edges {
        node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  
    singleimage: file(relativePath: { eq: "discover.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    } 
  }  
`
