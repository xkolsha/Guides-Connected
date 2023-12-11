import { Typography, Avatar, Box, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";

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
        style={{ paddingBottom: "1.33rem" }}
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
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
              }}
            >
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
