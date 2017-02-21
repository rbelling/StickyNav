import '../sass/app.scss'; //import the main css file into our js bundle

const page = () => {
  document.querySelector('.target').innerHTML = 'Hello JS!!!';
};

page().init();
export default page;
