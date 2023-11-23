import { Typography, Avatar, Box, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const testimonials = [
  {
    name: "Neda Bernabo",
    position: "K-12 Experiential Learning Consultant",
    organization: "Ottawa Catholic School Board",
    testimonial:
      "Educators, are you looking to allow your students to explore STEAM fields...",
    photo: "/path/to/neda-bernabo-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections...",
    photo: "/path/to/kate-charette-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections...",
    photo: "/path/to/kate-charette-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections...",
    photo: "/path/to/kate-charette-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections...",
    photo: "/path/to/kate-charette-photo.jpg",
  },
  {
    name: "Kate Charette",
    position: "Associate Director, Curriculum (Humanities and Languages)",
    organization:
      "New Brunswick Department of Education and Early Childhood Development",
    testimonial:
      "Our partnership with Guides Connected has facilitated important connections...",
    photo: "/path/to/kate-charette-photo.jpg",
  },
  // ...other testimonials
];

const Testimonials = () => {
  return (
    <Box sx={{ width: "100%", py: 8, bgcolor: "background.default" }}>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        fontWeight={"bold"}
        mb={6}
      >
        What our customers say.
      </Typography>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Paper elevation={3} sx={{ p: 4, mx: "auto", maxWidth: 345 }}>
              <Avatar
                src={testimonial.photo}
                alt={testimonial.name}
                sx={{ width: 90, height: 90, mb: 2 }}
              />
              <Typography variant="h6" component="div">
                {testimonial.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
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
