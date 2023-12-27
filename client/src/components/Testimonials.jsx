import { Typography, /* Avatar, */ Box, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
import quotationIcon from "../assets/icons/quotationIcon.svg";

// Import Swiper styles
import "swiper/css";

const testimonials = [
  {
    name: "Neda Bernabo",
    position: "K-12 Experiential Learning Consultant",
    organization: "Ottawa Catholic School Board",
    testimonial:
      "Educators, are you looking to allow your students to explore STEAM fields and get advice from experts in those areas, then I highly recommend checking out Guides Connected. This innovative company connects students with experienced professionals across a wide range of STEAM fields, providing valuable insights and guidance that can help students make informed decisions about their future. With Guides Connected, you'll have access to a diverse network of experts who are passionate about sharing their knowledge and expertise with the next generation. Whether you're interested in biology, engineering, computer science, or any other STEAM field, you can find experts who are eager to answer your questions and provide valuable career advice. What sets Guides Connected apart is their commitment to personalized matching. They take the time to adapt and modify presentations/lessons , and then connect you with experts who are well-suited to help you with your initiative. This ensures that you get the most out of your experience with the Guides Connected speaker Overall, I highly recommend Guides Connected for any educator or student who wants to explore STEAM fields and get advice from experienced experts. Their personalized approach and diverse network make them a top choice for anyone looking to learn more from an expert in the STEAM field.",
    photo: "/path/to/neda-bernabo-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections between educators, curriculum developers, resource developers, and academic experts. Guides Connected has been able to source experts for some very specific requests, supported the development of educational content and materials that are both rigorous and age-appropriate, and have been flexible with designing custom resources. They have been able to adapt to our timelines and needs, have been quick to respond and easy to work with. We look forward to continuing and expanding this partnership.",
    photo: "/path/to/neda-bernabo-photo.jpg",
  },

  // ...other testimonials
];

const Testimonials = () => {
  const theme = useTheme();
  return (
    <Box
      maxWidth="xg"
      sx={{
        width: "100%",
        py: 8,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.primary.main,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight={"bold"}
        mb={6}
      >
        What Our Customers Say
        <span style={{ color: "#FF5733" }}>.</span>{" "}
      </Typography>
      <Swiper
        style={{ padding: "1.33rem" }}
        spaceBetween={30}
        slidesPerView={1} // Default is 1 slide per view for small screens
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          // When window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                mx: "auto",
                maxWidth: 345,
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                borderRadius: theme.shape.borderRadius,
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* Top Left Corner, moved half outside the card */}
              <img
                src={quotationIcon}
                alt="Quotation"
                style={{
                  position: "absolute",
                  top: "-30px", // half outside the card
                  left: "-10px", // half outside the card
                  width: "16vw", // responsive width
                  height: "auto", // maintain aspect ratio
                  zIndex: 1,
                  maxWidth: "60px", // maximum size
                  maxHeight: "60px", // maximum size
                }}
              />

              {/* Bottom Right Corner, moved half outside the card */}
              <img
                src={quotationIcon}
                alt="Quotation"
                style={{
                  position: "absolute",
                  bottom: "-30px", // half outside the card
                  right: "-10px", // half outside the card
                  width: "16vw", // responsive width
                  height: "auto", // maintain aspect ratio
                  zIndex: 1,
                  maxWidth: "60px", // maximum size
                  maxHeight: "60px", // maximum size
                }}
              />

              {/* <Avatar
                src={testimonial.photo}
                alt={testimonial.name}
                sx={{ width: 90, height: 90, mb: 2 }}
              /> */}
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {testimonial.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3 }} gutterBottom>
                {testimonial.position}
              </Typography>
              <Typography variant="body2">{testimonial.testimonial}</Typography>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonials;
