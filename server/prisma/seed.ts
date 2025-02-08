import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      id: 1,
      name: "Concert",
      description: "Live music performances by artists in various genres.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Conference",
      description:
        "Educational events featuring speakers and workshops on specific topics.",
      image:
        "https://images.unsplash.com/photo-1558024931-23978e8235c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Festival",
      description: "Cultural celebrations with food, music, and entertainment.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: "Exhibition",
      description: "Displays of art, photography, or other creative works.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: "Sports Event",
      description:
        "Competitions in various sports such as football, basketball, and tennis.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      name: "Theater Performance",
      description: "Live dramatic presentations of plays and musicals.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      name: "Workshop",
      description:
        "Interactive sessions focused on learning new skills or techniques.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      name: "Networking Event",
      description:
        "Meetings designed to facilitate professional connections and collaborations.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 9,
      name: "Charity Event",
      description:
        "Fundraising activities aimed at supporting charitable causes.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 10,
      name: "Movie Screening",
      description: "Public showings of films in theaters or outdoor venues.",
      image:
        "https://images.unsplash.com/photo-1519681393784-d126f5d9d500?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const events = [
    {
      title: "Rock Night Live Concert",
      excerpt:
        "Experience the best of rock music with top artists performing live.",
      content:
        "Join us for an unforgettable night of rock music featuring some of the most talented artists in the industry. Enjoy a night filled with energy, music, and fun.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "rock-night-live-concert",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 5 }],
      },
    },
    {
      title: "Tech Expo 2023",
      excerpt:
        "Discover the latest innovations in technology with a showcase of cutting-edge products and technologies.",
      content:
        "Join us for a tech expo where you can explore the latest innovations in technology and witness cutting-edge products and technologies in action.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "tech-expo-2023",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 5 }],
      },
    },
    {
      title: "Art Exhibition",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "art-exhibition",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 5 }],
      },
    },
    {
      title: "Music Festival",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "music-festival",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 4 }],
      },
    },
    {
      title: "Fashion Show",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "fashion-show",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 5 }],
      },
    },
    {
      title: "Sports Tournament",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "sports-tournament",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 6 }],
      },
    },
    {
      title: "Concert",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "concert",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 7 }],
      },
    },
    {
      title: "Art Exhibition",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "art-exhibition",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 8 }],
      },
    },
    {
      title: "Music Festival",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "music-festival",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 9 }],
      },
    },
    {
      title: "Fashion Show",
      excerpt:
        "Immerse yourself in the world of art with a captivating art exhibition.",
      content:
        "Join us for an art exhibition where you can witness the beauty and creativity of various artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      location: "City Auditorium",
      slug: "fashion-show",
      published: true,
      publishedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      CategoryEvent: {
        create: [{ categoryId: 10 }],
      },
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Dummy categories & events created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
