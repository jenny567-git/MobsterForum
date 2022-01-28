using mobster_backend.Database;
using mobster_backend.Interfaces;
using mobster_backend.Models;
using System;
using System.Threading.Tasks;

namespace mobster_backend.Services
{
    public class DatabaseSeedService : IDatabaseSeedService
    {
        private readonly MobsterContext context;

        public DatabaseSeedService(MobsterContext context)
        {
            this.context = context;
        }

        public async Task SeedDatabase()
        {
           AddSeedData();
        }

        public void AddSeedData()
        {

            #region Users

            var user1 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f296b0c725130071fde31d",
                UserName = "DonElmis",
                CreatedAt = new DateTime(2021,02,23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,

            };

            var user2 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f29673daa5cc006ace42f0",
                UserName = "CarmelaSoprano",
                CreatedAt = new DateTime(2021, 03, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,
            };

            var user3 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f292ba3cd34e006c5839c3",
                UserName = "DonCalzone",
                CreatedAt = new DateTime(2020, 02, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = true,
            };

            var user4 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f2921b3cd34e006c583978",
                UserName = "JackSparrow",
                CreatedAt = new DateTime(2021, 09, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,
            };

            var user5 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f2900e1a44500069eb7c7a",
                UserName = "JennyLawless",
                CreatedAt = new DateTime(2021, 08, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,
            };

            var user6 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f2904cdaa5cc006ace415b",
                UserName = "DanniDevito",
                CreatedAt = new DateTime(2021, 01, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,
            };

            var user7 = new User()
            {
                UserId = Guid.NewGuid(),
                AuthId = "61f2907fdaa5cc006ace4169",
                UserName = "ChrillisCorleone",
                CreatedAt = new DateTime(2021, 11, 23),
                UpdatedAt = DateTime.Now,
                IsActive = true,
                IsBanned = false,
            };

            context.Users.AddRange(user1, user2, user3, user4, 
                user5, user6, user7);
            context.SaveChanges();

            #endregion

            #region Families

            var fam1 = new Family()
            {
                FamilyId = new Guid("AF384033-48B1-4B2E-9CEB-007843BF85BF"),
                Name = "Cleaner-issues",
                Description = "When you're in desperate need of assistance regarding clean up",
                MemberCount = 243,
                AddedAt = new DateTime(2020 - 11 - 19),
                UpdatedAt = DateTime.Now,

            };

            var fam2 = new Family()
            {
                FamilyId = new Guid("4451A114-79F2-4ECC-ACAD-E64942747AC7"),
                Name = "Gun Cleaning",
                Description = "How to avoid shooting yourself while cleaning your piece",
                MemberCount = 333,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            var fam3 = new Family()
            {
                FamilyId = new Guid("684EDB4D-AB69-469C-9F6B-32806556DF8B"),
                Name = "Offers you can't refuse",
                Description = "Don't ask, tell",
                MemberCount = 666,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            var fam4 = new Family()
            {
                FamilyId = new Guid("383979C1-ADC7-427B-8C6E-EB6DAEB9A5FC"),
                Name = "How to spy on your spouse",
                Description = "or any other cheating bastard",
                MemberCount = 24,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            var fam5 = new Family()
            {
                FamilyId = new Guid("5DCA4C06-5985-4972-B332-05E346E76010"),
                Name = "Missing family members",
                Description = "Lost, gone or sleeping with the fishes?",
                MemberCount = 343,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            var fam6 = new Family()
            {
                FamilyId = new Guid("3F41F931-D8A9-44EC-8AB0-15ADE73A61BB"),
                Name = "Buy/sell",
                Description = "Snitches get stitches",
                MemberCount = 543,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            var fam7 = new Family()
            {
                FamilyId = new Guid("A2311FA1-8772-45BE-91EF-63DC7548CF91"),
                Name = "Food",
                Description = "Take the gun, leave the cannoli",
                MemberCount = 273,
                AddedAt = new DateTime(2020, 11, 19),
                UpdatedAt = DateTime.Now,


            };

            context.Families.AddRange(fam1, fam2, fam3, fam4, fam5, fam6, fam7);
            context.SaveChanges();

            #endregion

            #region Thread

            var thread1 = new Thread()
            {
                ThreadId = new Guid("0011315A-5CBB-4AFF-BD97-1D9B1D0207BB"),
                FamilyId = fam1.FamilyId,
                AuthorId = user1.UserId,
                Title = "Dammråttor",
                Content = "Jag har problem med dammråttor under sängen, " +
                "hur blir jag av med dom? Jag har försökt ge dom cyanid, " +
                "men det verkar inte funka.Ska jag prova arsenik?",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now

            };

            var thread2 = new Thread()
            {
                ThreadId = new Guid("54BB3A0F-BA8A-4BF1-AB22-01C2D2B856F6"),
                FamilyId = fam1.FamilyId,
                AuthorId = user2.UserId,
                Title = "Blodfläckar",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 02),
                UpdatedAt = DateTime.Now

            };

            var thread3 = new Thread()
            {
                ThreadId = new Guid("8799022F-C22E-4604-BB59-1BB3FB444DB8"),
                FamilyId = fam2.FamilyId,
                AuthorId = user1.UserId,
                Title = "Accidents when cleaning",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 23),
                UpdatedAt = DateTime.Now

            };

            var thread4 = new Thread()
            {
                ThreadId = new Guid("48D4852A-4B2F-475B-B157-F2C9FEB23D5E"),
                FamilyId = fam3.FamilyId,
                AuthorId = user7.UserId,
                Title = "3 for 2 on mugshots",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2021, 01, 22),
                UpdatedAt = DateTime.Now

            };

            var thread5 = new Thread()
            {
                ThreadId = new Guid("2D392DD7-A934-45FB-B2D4-FD4E4DE984F6"),
                FamilyId = fam4.FamilyId,
                AuthorId = user4.UserId,
                Title = "Night vision goggles",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2021, 07, 22),
                UpdatedAt = DateTime.Now

            };

            var thread6 = new Thread()
            {
                ThreadId = new Guid("C03BBD58-4481-4673-9E83-35FEF93388D8"),
                FamilyId = fam7.FamilyId,
                AuthorId = user5.UserId,
                Title = "Comfort food for widows",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 12),
                UpdatedAt = DateTime.Now

            };

            var thread7 = new Thread()
            {
                ThreadId = new Guid("37344CD6-1EDF-4A33-8FA4-FD893A377BBC"),
                FamilyId = fam5.FamilyId,
                AuthorId = user6.UserId,
                Title = "Hide and seek",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 17),
                UpdatedAt = DateTime.Now

            };

            var thread8 = new Thread()
            {
                ThreadId = new Guid("9583980D-9D75-46C9-BC6F-409E18A1B0BF"),
                FamilyId = fam3.FamilyId,
                AuthorId = user1.UserId,
                Title = "How to get a raise",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2021, 11, 22),
                UpdatedAt = DateTime.Now

            };

            var thread9 = new Thread()
            {
                ThreadId = new Guid("746B4B96-87EF-40CF-9432-26D904D5E1AA"),
                FamilyId = fam2.FamilyId,
                AuthorId = user3.UserId,
                Title = "The Glock",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01,  22),
                UpdatedAt = DateTime.Now

            };

            var thread10 = new Thread()
            {
                ThreadId = new Guid("DED05300-B97B-49EA-B9D5-5CB489C9D935"),
                FamilyId = fam1.FamilyId,
                AuthorId = user7.UserId,
                Title = "My cleaner is a snitch",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 22),
                UpdatedAt = DateTime.Now

            };

            var thread11 = new Thread()
            {
                ThreadId = new Guid("EAD17D0D-3862-43BF-AF46-B6BBF4739608"),
                FamilyId = fam6.FamilyId,
                AuthorId = user7.UserId,
                Title = "Getting rid of some totally legit stuff, definitely not stolen",
                Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
                "nisi ut aliquip ex ea commodo consequat.",
                CreatedAt = new DateTime(2022, 01, 22),
                UpdatedAt = DateTime.Now

            };

            context.Threads.AddRange(thread1, thread2, thread3, thread4, thread5, 
                thread6, thread7, thread8, thread9, thread10, thread11);
            context.SaveChanges();

            #endregion

            #region Posts

            var post1 = new Post()
            {
                PostId = new Guid("F2AAB503-FF43-4950-81E5-07FBABA79A97"),
                ThreadId = thread1.ThreadId,
                Content = "Kan du inte bara skjuta dom och sen ringa din cleaner?",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user1
            };

            var post2 = new Post()
            {
                PostId = new Guid("FA14E4A1-301D-4744-83EB-0579D06E011B"),
                ThreadId = thread2.ThreadId,
                Content = "Jag har en bra cleaner som inte ställer frågor, jag skickar dm.",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user2

            };

            var post3 = new Post()
            {
                PostId = new Guid("F2041DEE-3A1D-493F-86F1-C426A70299CD"),
                ThreadId = thread3.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user1

            };

            var post4 = new Post()
            {
                PostId = new Guid("89122C27-265D-44E4-B974-53ED07619282"),
                ThreadId = thread4.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user7
            };

            var post5 = new Post()
            {
                PostId = new Guid("239E4F77-C5E7-4CDA-B953-BEAF4C3C7A6C"),
                ThreadId = thread9.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 19),
                UpdatedAt = DateTime.Now,
                Author = user3

            };

            var post6 = new Post()
            {
                PostId = new Guid("D1B73B56-A6EB-4E2E-B392-0CF779A63204"),
                ThreadId = thread5.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user4
            };

            var post7 = new Post()
            {
                PostId = new Guid("51FA0A5F-C305-41E5-8AE5-1BE6EC3FF10B"),
                ThreadId = thread6.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user5
            };

            var post8 = new Post()
            {
                PostId = new Guid("0A0F20D8-FB45-41B0-ACDE-37C81509364A"),
                ThreadId = thread8.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 18),
                UpdatedAt = DateTime.Now,
                Author = user1
            };

            var post9 = new Post()
            {
                PostId = new Guid("5F1850D1-B8A9-4DFA-8A80-742C68C33990"),
                ThreadId = thread10.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user7
            };

            var post10 = new Post()
            {
                PostId = new Guid("C3299F79-18BC-4648-9A70-4477261FA66B"),
                ThreadId = thread11.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 20),
                UpdatedAt = DateTime.Now,
                Author = user7
            };

            var post11 = new Post()
            {
                PostId = new Guid("99CA65C6-1F4F-4464-AC7A-5CB833C99335"),
                ThreadId = thread7.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 11),
                UpdatedAt = DateTime.Now,
                Author = user6
            };

            var post12 = new Post()
            {
                PostId = new Guid("C84480CE-8086-4BAC-91F1-7D81FF611F12"),
                ThreadId = thread9.ThreadId,
                Content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem " +
                "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo " +
                "inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
                CreatedAt = new DateTime(2022, 01, 21),
                UpdatedAt = DateTime.Now,
                Author = user3
            };

            context.Posts.AddRange(post1, post2, post3, post4, post5, post6, post7, post8, 
                post9, post10, post11, post12);
            context.SaveChanges();

            #endregion

            #region Admin

            var admin1 = new Admin()
            {
                AdminId = new Guid("E2C316E7-9FAA-4556-977E-FA021C1265A0"),
                UserId = user2.UserId,
                FamilyId =  fam1.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 2)
                
            };

            var admin2 = new Admin()
            {
                AdminId = new Guid("BE47D44C-087F-445D-813B-94836778037B"),
                UserId = user3.UserId,
                FamilyId = fam2.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 1)
            };

            var admin3 = new Admin()
            {
                AdminId = new Guid("3B8C6A05-FF72-4D52-B840-CCA00B8EB6E6"),
                UserId = user1.UserId,
                FamilyId = fam3.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 3)
            };

            var admin4 = new Admin()
            {
                AdminId = new Guid("35CF7C1D-F06E-4A17-B420-F650144795F4"),
                UserId = user4.UserId,
                FamilyId = fam4.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 4)
            };

            var admin5 = new Admin()
            {
                AdminId = new Guid("4F05A8ED-E83D-43B3-A002-98B8FDCE6D08"),
                UserId = user6.UserId,
                FamilyId = fam5.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 5)
            };

            var admin6 = new Admin()
            {
                AdminId = new Guid("86EE6AD8-6993-4B10-B514-E71A166AD638"),
                UserId = user7.UserId,
                FamilyId = fam6.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 6)
            };

            var admin7 = new Admin()
            {
                AdminId = new Guid("E884C51A-75A4-4F1B-8D40-499F487DB384"),
                UserId = user5.UserId,
                FamilyId = fam7.FamilyId,
                UpdatedAt = DateTime.Now,
                CreatedAt = new DateTime(2021, 1, 7)
            };

            context.Admins.AddRange(admin1, admin2, admin3, admin4, 
                admin5, admin6, admin7);
            context.SaveChanges();

            #endregion

        }


    }
}
