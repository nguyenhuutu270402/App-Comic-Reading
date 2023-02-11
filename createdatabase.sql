--
-- alter user 'root'@'localhost' identified with mysql_native_password by 'root123';
create database db_comicreading;
use db_comicreading;
CREATE TABLE nguoidung (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
matkhau VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
tennguoidung VARCHAR(255) COLLATE utf8mb4_unicode_ci,
avatar TEXT COLLATE utf8mb4_unicode_ci,
phanquyen INT NOT NULL
);



CREATE TABLE truyen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tentruyen VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    tenkhac VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    tinhtrang INT not null,
    mota TEXT COLLATE utf8mb4_unicode_ci,
    imagelink TEXT COLLATE utf8mb4_unicode_ci
);

CREATE TABLE tacgia (
id INT AUTO_INCREMENT PRIMARY KEY,
tentacgia VARCHAR(255) COLLATE utf8mb4_unicode_ci not null
);

CREATE TABLE ct_tacgia (
  id INT PRIMARY KEY AUTO_INCREMENT,	
  idtruyen INT not null,
  idtacgia INT not null,
  FOREIGN KEY (idtruyen) REFERENCES truyen(id),
  FOREIGN KEY (idtacgia) REFERENCES tacgia(id)
);

CREATE TABLE theloai (
id INT AUTO_INCREMENT PRIMARY KEY,
tentheloai VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
mota TEXT COLLATE utf8mb4_unicode_ci
);

CREATE TABLE ct_theloai (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idtruyen INT not null,
  idtheloai INT not null,
  FOREIGN KEY (idtruyen) REFERENCES truyen(id),
  FOREIGN KEY (idtheloai) REFERENCES theloai(id)
);

CREATE TABLE chuong (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenchuong VARCHAR(255) COLLATE utf8mb4_unicode_ci not null,
  sochuong float not null,
  ngaycapnhat datetime not null,
  idtruyen INT not null,
  FOREIGN KEY (idtruyen) REFERENCES truyen(id)
);
CREATE TABLE image_chuong (
id INT AUTO_INCREMENT PRIMARY KEY,
imagelink TEXT COLLATE utf8mb4_unicode_ci NOT NULL,
idchuong INT NOT NULL,
FOREIGN KEY (idchuong) REFERENCES chuong(id)
);

CREATE TABLE theodoi (
id INT AUTO_INCREMENT PRIMARY KEY,
idnguoidung INT not null,
idtruyen INT not null,
FOREIGN KEY (idnguoidung) REFERENCES nguoidung(id),
FOREIGN KEY (idtruyen) REFERENCES truyen(id)
);

CREATE TABLE binhluan (
id INT AUTO_INCREMENT PRIMARY KEY,
idnguoidung INT not null,
idtruyen INT not null,
noidung TEXT,
ngaybinhluan datetime not null,
FOREIGN KEY (idnguoidung) REFERENCES nguoidung(id),
FOREIGN KEY (idtruyen) REFERENCES truyen(id)
);

CREATE TABLE luotxem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idnguoidung INT not null,
  idchuong INT not null,
  ngayxem datetime not null,
  FOREIGN KEY (idnguoidung) REFERENCES nguoidung(id),
  FOREIGN KEY (idchuong) REFERENCES chuong(id)
);

CREATE TABLE danhgia (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idnguoidung INT not null,
  idtruyen INT not null,
  sosao INT not null,
  FOREIGN KEY (idnguoidung) REFERENCES nguoidung (id),
  FOREIGN KEY (idtruyen) REFERENCES truyen (id)
);

INSERT INTO nguoidung (email, matkhau, tennguoidung, avatar, phanquyen) VALUES 
('example1@gmail.com', 'password123', 'User 1', 'https://giaydantuonganhtuan.vn/upload_images/images/ANI%20-%20103.jpg', '0')
,('example2@gmail.com', 'password123', 'User 2', 'https://giaydantuonganhtuan.vn/upload_images/images/ANI%20-%20103.jpg', '0')
,('example3@gmail.com', 'password123', 'User 3', 'https://giaydantuonganhtuan.vn/upload_images/images/ANI%20-%20103.jpg', '0')
,('example4@gmail.com', 'password123', 'User 4', 'https://giaydantuonganhtuan.vn/upload_images/images/ANI%20-%20103.jpg', '0')
,('example5@gmail.com', 'password123', 'User 5', 'https://giaydantuonganhtuan.vn/upload_images/images/ANI%20-%20103.jpg', '0')
;

INSERT INTO truyen (tentruyen, tenkhac, tinhtrang, mota, imagelink) VALUES 
('Nanase-san no Koi ga Ijou', 'Cô nàng cuồng tình Nanase', 1, 'Takahashi đã gặp được Nanase, một cô gái dễ thương và trong sáng thông qua ứng dụng hẹn hò. Quan hệ của cả hai ngày càng tiến triển một cách tốt đẹp rồi bỗng dưng một ngày nọ Takahashi được Nanase mời tới nhà mình chơi và chứng kiến một cảnh tượng bất ngờ', 'https://st.nettruyenup.com/data/comics/46/co-nang-cuong-tinh-nanase.jpg')
,('D-kyuu Boukensha No Ore, Naze Ka Yuusha Party Ni Kanyuu Sareta Ageku, Oujo Ni Tsukima Towareteru','Tôi là một Nhà thám hiểm hạng D, vì một số lý do mà tôi đã được tuyển dụng vào một đảng anh hùng, và bây giờ công chúa đang theo dõi tôi', 1,'Nếu bạn trở thành một anh hùng và đánh bại Quỷ Vương, một cuộc sống nhàn hạ đang chờ bạn ...! Đây là điều mà chàng trai trẻ Jirei tin tưởng, và anh ấy đã làm việc chăm chỉ cả ngày lẫn đêm để đạt được mục tiêu của mình. Tuy nhiên, khi phát hiện ra rằng những anh hùng đánh bại Quỷ Vương là những người đang làm tất cả những công việc khó khăn, anh ta đã bỏ chạy. Nhưng những cô gái mà Jirei đã cứu trong cuộc hành trình của anh ấy trước khi anh ấy biết điều đó lần lượt đổ về để giành lấy trái tim và thể xác của anh ấy ...?','https://st.nettruyenup.com/data/comics/195/d-kyuu-boukensha-no-ore-naze-ka-yuusha-p-9809.jpg')
,('Fantasy Bishoujo Juniku Ojisan To','', 1,'Câu truyện hài lãng mãn của cặp đôi bạn thân. Một trung niên và một đã từng là trung niên','https://st.nettruyenup.com/data/comics/60/fantasy-bishoujo-juniku-ojisan-to.jpg')
,('The Fragrant Flower Blooms With Dignity - Kaoru Hana Wa Rin To Saku','Những đóa hoa thơm nở diễm kiều, Kaoru Hana Wa Rin To Saku', 1,'Ở một nơi nào đó, có 2 trường cao trung lân cận. Cao trung Chidori, một trường nam sinh cấp thấp hội tụ đủ những thằng đần, trường nữ sinh Kikyo, một trường nữ sinh danh giá . Rintaro Tsugumi, một nam sinh năm 2 to khỏe và trầm tính tại trường Chidori, bắt gặp Kaoruko Waguri, một khách hàng khi cậu đang giúp việc tại cửa hàng bánh nhà mình . Rintaro cảm thấy thoải mái khi dành thời gian bên Kaoruko, nhưng cô lại là học sinh của trường Kikyo, ngôi trường hàng xóm cực kì căm ghét trường Chidori. Đây là câu chuyện về 2 con người ở rất gần nhưng lại rất xa','https://st.nettruyenup.com/data/comics/177/the-fragrant-flower-blooms-with-dignity-4746.jpg')
,('Ningen Fushin No Boukenshatachi Ga Sekai O Sukuu Youdesu ','', 1,'Câu chuyện về bốn nhà thám hiểm, tất cả những người đã trải qua sự phản bội và khó khăn, cùng nhau vươn lên trong xã hội. Nhóm dịch : Sứa fuho team','https://st.nettruyenup.com/data/comics/227/ningen-fushin-no-boukenshatachi-ga-sekai-9739.jpeg')
,('UCHI NO OTOUTO-DOMO GA SUMIMASEN','', 1,'Mẹ của Ito đã tái hôn và cô bắt đầu cuộc sống mới với tư cách là chị gái của 4 anh chị em! Sự khởi đầu của một bộ phim hài tình yêu gia đình với bốn anh em sẽ bắt đầu và kết thúc như thế nào!?','https://st.nettruyenup.com/data/comics/11/uchi-no-otouto-domo-ga-sumimasen.jpg' )
,('SHIBUYA KINGYO','Shibuya Kingyo - Cá Vàng Sát Thủ', 1,'Tsukiyoda, một chàng trai nhút nhát, không thể hòa nhập được với cuộc sống hiện đại, sau khi giúp đỡ cô bạn nổi tiếng cùng trường và được trả công bằng bữa trưa. Những tưởng cuộc sống của mình đã thay đổi, nhưng không mọi thứ thay đổi','https://st.nettruyenup.com/data/comics/89/shibuya-kingyo.jpg' )
,('LOẠN ĐẤU TOKYO','', 1,'"Giải đấu Tokyo Loop Line" là một hệ thống chính thức được dùng để hỗ trợ sự khôi phục và phát triển nề kinh tế cho thủ đô Tokyo sau Thế chiến thứ 2, nhằm giải quyết bất đồng giữa các cộng đồng có địa phận nằm trên tuyến tàu Yamanote. Và sau một khoảng thời gian dài yên bình. Mâu thuẫn lại một lần nữa được đẩy cao với sự xuất hiện của một nha ga Takanawa mới khai trương và lợi nhuận khổng lồ nó có thể mang lại. Do đó "Giải đấu Tokyo Loop Line" cũng được hồi sinh để giải quyết những tranh chấp nảy sinh từ lòng tham. Và nhân vật chính của chúng ta, Yasuda Koinosuke - đấu sĩ đại diện của ga Kanda, chính thức tham chiến!','https://st.nettruyenup.com/data/comics/39/loan-dau-tokyo.jpg' )
,('FREESIA','', 1,'Freesia lấy bối cảnh một xã hội Nhật Bản "khác" đang trong chiến tranh và đã thông qua luật hợp pháp hóa các vụ giết người trả thù. Nếu ai đó giết người thân yêu của bạn, bạn sẽ có thể hợp pháp "trả thù".Đây là trang giới thiệu manga một cách nghiệp dư','https://st.nettruyenup.com/data/comics/94/freesia.jpg' )
,('MURABITO TENSEI: SAIKYOU NO SLOW LIFE','Murabito Tensei: Saikyo No Slow Life', 1,'Chúa đã vô tình giết chết tôi và cho tôi được chuyển sinh. Sống trong một ngôi làng nhỏ bé và được vây quanh bởi cô em gái xinh đẹp, những cô bạn gái thơ ấu. Hãy cùng tôi tận hưởng cuộc sống yên bình ở thế giới mới này nào!','https://st.nettruyenup.com/data/comics/169/murabito-tensei-saikyou-no-slow-life.jpg' )
,('ARTE','', 1,'Vào thế kỉ 16, nước Ý - Firenze, là cái nôi của thời kì Phục hưng, nơi nghệ thuật phát triển mạnh mẽ. Ở một góc nhỏ của thành phố rộng lớn này, hành trình của một cô gái sống một cuộc sống êm ả nhưng ấp ủ hoài bão về nghệ thuật bắt đầu. Cô ao ước trở thành một họa sĩ, một sự nghiệp bất khả thi cho một cô gái sinh ra trong một gia đình quí tộc. Vào thời đó, nghệ thuật là một nghề dành riêng cho phái nam, đối với một người phụ nữ sẽ vấp phải làn sóng phân biệt đối xử mạnh mẽ. Bất chấp những thử thách, Arte vẫn kiên trì với sự cần mẫn và thái độ tích cực của mình!','https://st.nettruyenup.com/data/comics/235/arte.jpg' )
,('BÍ ẨN TRONG THẾ GIỚI MA THUẬT','', 1,'"...Theo một nghĩa nào đó, có thể nói rằng pháp sư hiện đại chính là nghề sưu tập thiên sứ" "Tháp Đồng Hồ". Đó là trung tâm của thế giới pháp sư. Đại bản doanh của Hiệp Hội Pháp Sư, nơi nắm giữ những thần bí quý giá. El-Melloi II, Lord của Khoa Ma Thuật Hiện Đại trong "Tháp Đồng Hồ" này, vì một số lý do, đã bị cuốn vào vụ thừa kế gia sản ở Lâu đài Biệt cư Adra. Có rất nhiều thiên sứ tạc khắc bên trong lâu đài, và chỉ người nào giải được bí ẩn về cái "Tên Thiên Sứ" được trao cho mỗi vị khách được mời tới, thì mới được thừa kế "di sản" của Lâu đài Biệt cư Adra. Thế nhưng, đó không đơn thuần chỉ là việc giải câu đố, mà còn là khởi đầu của một sự kiện bi thương vô cùng huyền hoặc, thậm chí đối với cả những pháp sư chức vị cao thuộc "Tháp Đồng Hồ". "Hồ sơ của Lord El-Melloi II", một sự pha trộn giữa ma thuật và thần bí, ảo tưởng và bí ẩn, xin được phép bắt đầu.','https://st.nettruyenup.com/data/comics/170/bi-an-trong-the-gioi-ma-thuat.jpg' )
,('RE CERVIN','', 1,'Arsinoe, cô Công chúa trẻ xứ Helenthal bỗng thức giấcvà chợt nhận ra rằng mình đã thiếp đi hàng tháng trờikể từ ngày Vương Quốc của mình bị Đế Chế Ilia xâm chiếm. Vào ngày đó, người mẹ của cô đã bị giết, Ác Long thức tỉnh,và quê hương của cô đã chìm trong biển lửa. Và với sức mạnh của Cent Fuana "Cuồng nữ bạo thực ký ức",cô đã có thể cầm chân con Ác Long,xong, cô đã mất đi ký ức về người cha của mình. Có một người đàn ông xuất hiện và tự xưng mình là cha của cô, ông ta tên Cervin. Một vị vua mất nước, và một cô công chúamất đi ký ức về người cha của mình.2 con người cùng nhau đi trên một hành trìnhnhằm để khôi phục lại những thứ đã bị đánh mất.','https://st.nettruyenup.com/data/comics/231/re-cervin.jpg' )
,('USOGUI','', 1,'Trong các sòng bạc chui tại nhật bản,nơi mạng sống của người chơi cũng có thể mang ra cá cược như những món đồ.Sòng bạc cùng các thế lực lớn ở đây luôn tìm mọi cách để móc túi người chơi,biến họ thành những con nợ.Baku Madarame một con bạc đã giúp nhiều người thoát khỏi cám dỗ.....','https://st.nettruyenup.com/data/comics/77/usogui.jpg' )
,('HOKENSHITSU NO TSUMURI-SAN','Cô y tế Tsumuri', 1,'Cô y tá hay ngất xỉu, lười biếng, chậm chạp, lơ đễnh','https://st.nettruyenup.com/data/comics/12/hokenshitsu-no-tsumuri-san.jpg' )
,('BOKU WA AYASHII KIMI NO MONO','I Belong to You, Immoral', 1,'Shou-chan là thành viên của ban đạo đức. Cậu muốn có một cuộc sống học đường lành mạnh, sống theo lý tưởng của Bác Hồ vĩ đại. DĨ nhiên đời không như mơ, bạn thuở nhỏ của cậu- Sayo lại là một succubus. Liệu main của chúng ta có giữ tỉnh táo được đầu trên hay sẽ bị đầu dưới chi phối?','https://st.nettruyenup.com/data/comics/85/boku-wa-ayashii-kimi-no-mono.jpg' )
,('DEAD MOUNT DEATH PLAY','', 1,'Một thể loại xuyên không nhưng là xuyên không từ thế giới fantasy sang thế giới hiện đại. một trò chơi hại não và kinh dị bắt đầu','https://st.nettruyenup.com/data/comics/203/dead-mount-death-play.jpg' )
,('HITOTSU YANE NO SHITA NO','...Under One Roof', 1,'Năm nhất trung học Yuzuriha Kyuuta đã hứa với Ririko - người bạn tuổi thơ của cậu - rằng sẽ cưới cô ấy khi họ lớn lên. Bị chia cắt từ hồi tiểu học, cậu bây giờ đã nhập học cùng trường với cô ấy, một trường học nữ sinh dành cho những quý cô trẻ mới mở cho học sinh nam, để được gặp lại cô ấy. Nhưng để được gặp, cậu phải xuống trong kí túc xá nữ và cô ấy là trưởng kí túc xá? Và hơn nữa, cô ấy có vẻ không nhớ gì về cậu! Vậy Kyuuta sẽ làm thế nào để có thể giữ lời hứa của mình?','https://st.nettruyenup.com/data/comics/64/hitotsu-yane-no-shita-no.jpg' )
,('AJIN-CHAN WA KATARITAI','', 1,'Nếu bạn là thầy giáo và học sinh đều là những em lai quỷ dễ thương, bạn sẽ làm gì? theo dõi để xem anh main chúng ta sẽ xử lí thế nào với những vấn đề hết sức cute của mấy em này nhé.','https://st.nettruyenup.com/data/comics/177/ajin-chan-wa-kataritai.jpg' )
,('GIA ĐÌNH CỦA NHỮNG CHIẾC BÓNG','Shadows House', 1,'Tại một vùng đất nọ, có những chiếc bóng sống cuộc sống giàu sang trong những tòa biệt thự khổng lồ, được phục vụ bởi những búp bê sống. Những búp bê này dành phần lớn thời gian để lau dọn bồ hóng được thải ra vô cùng tận từ những chủ nhân của họ. Hãy cùng theo dõi câu chuyện của Emilyko, một cô búp bê sống còn rất trẻ con và vui vẻ, đang học cách để phục vụ chủ nhân Kate của cô ấy.','https://st.nettruyenup.com/data/comics/56/gia-dinh-cua-nhung-chiec-bong.jpg' )

;

INSERT INTO tacgia (tentacgia) VALUES 
('Shinonome Toru')
,('Shiroao Toraneko')
,('Tsurusaki Yuu')
,('Mikami Saka')
,('Masaki Kawakami')
,('Shinta Fuji')
,('Akira Ozaki')
;

INSERT INTO ct_tacgia (idtruyen, idtacgia) VALUES 
(1,1)
,(2,2)
,(3,3)
,(4,4)
,(5,5)
,(5,6)
,(6,1)
,(6,7)
,(7,3)
,(8,4)
,(9,5)
,(10,6)
,(11,1)
,(12,2)
,(13,3)
,(14,4)
,(15,5)
,(15,7)
,(16,1)
,(17,2)
,(17,3)
,(18,4)
,(19,5)
,(20,7)
;

INSERT INTO theloai (tentheloai, mota) VALUES 
		('Action', 'Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh')
        ,('Adult', 'Thể loại Adult đề cập đến vấn đề nhạy cảm, chỉ dành cho tuổi 17+')
        ,('Adventure', 'Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật')
        ,('Anime', 'Truyện đã được chuyển thể thành film Anime')
        ,('Chuyển Sinh', 'Thể loại này là những câu chuyện về người ở một thế giới này xuyên đến một thế giới khác, có thể là thế giới mang phong cách trung cổ với kiếm sĩ và ma thuật, hay thế giới trong game, hoặc có thể là bạn chết ở nơi này và được chuyển sinh đến nơi khác')
        ,('Comedy', 'Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng')
        ,('Comic', 'Truyện tranh Châu Âu và Châu Mĩ')
        ,('Cooking', 'Thể loại có nội dung về nấu ăn, ẩm thực')
        ,('Cổ Đại', 'Truyện có nội dung xảy ra ở thời cổ đại phong kiến.')
        ,('Doujinshi', 'Thể loại truyện phóng tác do fan hay có thể cả những Mangaka khác với tác giả truyện gốc. Tác giả vẽ Doujinshi thường dựa trên những nhân vật gốc để viết ra những câu chuyện theo sở thích của mình')
		,('Drama','Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn')
        ,('Đam Mỹ','Truyện tình cảm giữa nam và nam.')
        ,('Ecchi','Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem')
        ,('Fantasy','Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên')
        ,('Gender Bender','Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam...')
        ,('Harem','Thể loại truyện tình cảm, lãng mạn mà trong đó, nhiều nhân vật nữ thích một nam nhân vật chính')
        ,('Historical','Thể loại có liên quan đến thời xa xưa')
        ,('Horror','Horror là: rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock - một thể loại không dành cho người yếu tim')
        ,('Josei','Thể loại của manga hay anime được sáng tác chủ yếu bởi phụ nữ cho những độc giả nữ từ 18 đến 30. Josei manga có thể miêu tả những lãng mạn thực tế , nhưng trái ngược với hầu hết các kiểu lãng mạn lí tưởng của Shoujo manga với cốt truyện rõ ràng, chín chắn')
        ,('Live action','Truyện đã được chuyển thể thành phim')
        ,('Manga','Truyện tranh của Nhật Bản')
        ,('Manhua','Truyện tranh của Trung Quốc')
        ,('Manhwa','Truyện tranh Hàn Quốc, đọc từ trái sang phải')
        ,('Martial Arts','Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện từ các trận đánh nhau, tự vệ đến các môn võ thuật như akido, karate, judo hay taekwondo, kendo, các cách né tránh')
        ,('Mature','Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa')
        ,('Mecha','Mecha, còn được biết đến dưới cái tên meka hay mechs, là thể loại nói tới những cỗ máy biết đi (thường là do phi công cầm lái)')
        ,('Mystery','Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng')
        ,('Ngôn Tình','Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính.')
        ,('One shot','Những truyện ngắn, thường là 1 chapter')
        ,('Psychological','Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)')
        ,('Romance', 'Thường là những câu chuyện về tình yêu, tình cảm lãng mạn. Ớ đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu')
        ,('School Life','Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học')
        ,('Sci-fi','Bao gồm những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra')
        ,('Seinen','Thể loại của manga thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40. Thể loại này có nhiều phong cách riêng biệt , nhưng thể loại này có những nét riêng biệt, thường được phân vào những phong cách nghệ thuật rộng hơn và phong phú hơn về chủ đề, có các loại từ mới mẻ tiên tiến đến khiêu dâm')
        ,('Shoujo','Đối tượng hướng tới của thể loại này là phái nữ. Nội dung của những bộ manga này thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...)')
        ,('Shoujo Ai','Thể loại quan hệ hoặc liên quan tới đồng tính nữ, thể hiện trong các mối quan hệ trên mức bình thường giữa các nhân vật nữ trong các manga, anime')
        ,('Shounen','Đối tượng hướng tới của thể loại này là phái nam. Nội dung của những bộ manga này thường liên quan đến đánh nhau và/hoặc bạo lực (ở mức bình thường, không thái quá)')
        ,('Shounen Ai','Thể loại có nội dung về tình yêu giữa những chàng trai trẻ, mang tính chất lãng mạn nhưng ko đề cập đến quan hệ tình dục')
        ,('Slice of Life','Nói về cuộc sống đời thường')
        ,('Smut','Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục')
        ,('Soft Yaoi','Boy x Boy. Nặng hơn Shounen Ai tí.')
        ,('Soft Yuri','Girl x Girl. Nặng hơn Shoujo Ai tí')
        ,('Sports','Đúng như tên gọi, những môn thể thao như bóng đá, bóng chày, bóng chuyền, đua xe, cầu lông,... là một phần của thể loại này')
        ,('Supernatural','Thể hiện những sức mạnh đáng kinh ngạc và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý')
        ,('Thiếu Nhi','Truyện tranh dành cho lứa tuổi thiếu nhi')
        ,('Tragedy','Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn')
        ,('Trinh Thám','Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra...')
        ,('Truyện scan','Các truyện đã phát hành tại VN được scan đăng online')
        ,('Truyện Màu','Tổng hợp truyện tranh màu, rõ, đẹp')
        ,('Webtoon','Là truyện tranh được đăng dài kỳ trên internet của Hàn Quốc chứ không xuất bản theo cách thông thường')
        ,('Xuyên Không','Xuyên Không, Xuyên Việt là thể loại nhân vật chính vì một lý do nào đó mà bị đưa đến sinh sống ở một không gian hay một khoảng thời gian khác. Nhân vật chính có thể trực tiếp xuyên qua bằng thân xác mình hoặc sống lại bằng thân xác người khác.')
;

INSERT INTO ct_theloai (idtruyen, idtheloai) VALUES 
(1,6)
,(1,11)
,(1,21)
,(1,30)
,(1,31)
,(1,34)
,(4,6)
,(4,11)
,(4,21)
,(4,31)
,(4,32)
,(2,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(6,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(6,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(6,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(7,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(7,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(7,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(7,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(8,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(8,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(8,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(9,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(9,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(9,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(9,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(10,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(10,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(10,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(11,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(11,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(11,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(11,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(12,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(13,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(13,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(13,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(14,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(14,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(14,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(15,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(16,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(16,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(16,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(17,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(17,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(17,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(17,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(18,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(18,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(18,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(18,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(19,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(19,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(19,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(19,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(19,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(20,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(20,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(20,FLOOR(RAND() * (50 - 1 + 1) + 1))
,(20,FLOOR(RAND() * (50 - 1 + 1) + 1))
;

INSERT INTO chuong (tenchuong, sochuong, ngaycapnhat, idtruyen) 
VALUES 
('Chapter 1: Cô gái tên Nanase', 1, '2023-02-04 12:00:00', 1)
,('Chapter 2: Nô lệ của công ty mất nhà', 2, '2023-02-05 12:00:00', 1)
,('Chapter 3: Em yêu anh vì XX', 3, '2023-02-06 12:00:00', 1)
,('Chapter 4: Hình phạt của Nanase', 4, '2023-02-06 18:00:00', 1)
,('Chapter 5: Cuộc viếng thăm bất ngờ của cô em gái', 5, '2023-02-09 12:00:00', 1)
,('Chapter 1', 1, '2022-12-05 12:00:00', 2)
,('Chapter 1', 1, '2022-12-15 12:00:00', 3)
,('Chapter 1', 1, '2022-12-08 12:00:00', 4)
,('Chapter 1', 1, '2022-12-25 12:00:00', 5)
,('Chapter 1', 1, '2022-12-05 12:00:00', 6)
,('Chapter 1', 1, '2022-12-15 12:00:00', 7)
,('Chapter 1', 1, '2022-12-08 12:00:00', 8)
,('Chapter 1', 1, '2022-12-25 12:00:00', 9)
,('Chapter 1', 1, '2022-12-05 12:00:00', 10)
,('Chapter 1', 1, '2022-12-15 12:00:00', 11)
,('Chapter 1', 1, '2022-12-08 12:00:00', 12)
,('Chapter 1', 1, '2022-12-25 12:00:00', 13)
,('Chapter 1', 1, '2022-12-05 12:00:00', 14)
,('Chapter 1', 1, '2022-12-15 12:00:00', 15)
,('Chapter 1', 1, '2022-12-08 12:00:00', 16)
,('Chapter 1', 1, '2022-12-25 12:00:00', 17)
,('Chapter 1', 1, '2022-12-05 12:00:00', 18)
,('Chapter 1', 1, '2022-12-15 12:00:00', 19)
,('Chapter 1', 1, '2022-12-08 12:00:00', 20)
,('Chapter 2', 2, '2022-12-05 12:00:00', 2)
,('Chapter 2', 2, '2022-12-15 12:00:00', 3)
,('Chapter 2', 2, '2022-12-08 12:00:00', 4)
,('Chapter 2', 2, '2022-12-25 12:00:00', 5)
,('Chapter 2', 2, '2022-12-05 12:00:00', 6)
,('Chapter 2', 2, '2022-12-15 12:00:00', 7)
,('Chapter 2', 2, '2022-12-08 12:00:00', 8)
,('Chapter 2', 2, '2022-12-25 12:00:00', 9)
,('Chapter 2', 2, '2022-12-05 12:00:00', 10)
,('Chapter 2', 2, '2022-12-15 12:00:00', 11)
,('Chapter 2', 2, '2022-12-08 12:00:00', 12)
,('Chapter 2', 2, '2022-12-25 12:00:00', 13)
,('Chapter 2', 2, '2022-12-05 12:00:00', 14)
,('Chapter 2', 2, '2022-12-15 12:00:00', 15)
,('Chapter 2', 2, '2022-12-08 12:00:00', 16)
,('Chapter 2', 2, '2022-12-25 12:00:00', 17)
,('Chapter 2', 2, '2022-12-05 12:00:00', 18)
,('Chapter 2', 2, '2022-12-15 12:00:00', 19)
,('Chapter 2', 2, '2022-12-08 12:00:00', 20)
,('Chapter 3', 3, '2022-12-05 12:00:00', 2)
,('Chapter 3', 3, '2022-12-15 12:00:00', 3)
,('Chapter 3', 3, '2022-12-08 12:00:00', 4)
,('Chapter 3', 3, '2022-12-25 12:00:00', 5)
,('Chapter 3', 3, '2022-12-05 12:00:00', 6)
,('Chapter 3', 3, '2022-12-15 12:00:00', 7)
,('Chapter 3', 3, '2022-12-08 12:00:00', 8)
,('Chapter 3', 3, '2022-12-25 12:00:00', 9)
,('Chapter 3', 3, '2022-12-05 12:00:00', 10)
,('Chapter 3', 3, '2022-12-15 12:00:00', 11)
,('Chapter 3', 3, '2022-12-08 12:00:00', 12)
,('Chapter 3', 3, '2022-12-25 12:00:00', 13)
,('Chapter 3', 3, '2022-12-05 12:00:00', 14)
,('Chapter 3', 3, '2022-12-15 12:00:00', 15)
,('Chapter 3', 3, '2022-12-08 12:00:00', 16)
,('Chapter 3', 3, '2022-12-25 12:00:00', 17)
,('Chapter 3', 3, '2022-12-05 12:00:00', 18)
,('Chapter 3', 3, '2022-12-15 12:00:00', 19)
,('Chapter 3', 3, '2022-12-08 12:00:00', 20)

;

INSERT INTO image_chuong (imagelink, idchuong) 
VALUES 
('https://blogger.googleusercontent.com/img/a/AVvXsEjHoVPoBWlhkx5ZW4cqXAIBZ3ZwslvuL2uykONtTqHyjrB2pU95UHNgsH6ccBo410c1Ha1BSX2CsU1mBSXVkDuMhlcvwudupM78XrNIhrj5GbGm-nyD2gSGui2LN3zDifhRQsFcfzlBmn-PuyZuiDA62NWE8p1TdhFGgiJEq8M_9fjR4PQtSA7gePZx=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEg6yqSuDhoaqOS9B2ct2HSD7UoaRsIEbqTvx4xeol-2HZA9l5z5YPVW3-bopKjb-GKL22WJQ_SpZC9r0g5xYrXzMYQa3-pN532Upxqe9zzJdlsLRANhUTNatkZX34O5PKvxn-3VfjpgIVAS7nTY02ZSXcXj2G_o4zIwin6BpFQLQ3CVKQoozKqb3jyW=s1400', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEjtngI6dVmfTJdK_mZtkj0KAbca7WYcw2jYLmgm5bkKFXoaPiraLhISJGCCALFTLFv6Z-h-ocYnC6FD0VyBBIEuOm38iXv-NkRHOjbxLz318B7TFPo_fcTDdYVw7NyBekhH77jr7AhlfpKXBFsmRR84Eseeotk416DSmEYpnWBwhDWRmYZtPkzmhqBA=s1180', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEh8QH4Z4w90d-XyX1_rAVGhlHV77-8n2dYsqdhrSwVfk6uXdBz3GeqNDnPxGIse8_0p_DuWvc_zfrfLFGgVgU-l85QTj9dDhA-U_48Cu46cloSohJ6lrrflueUoIDI4Ck2FN-D-7K_O327ZBlI1DigKMg0wg12f1zxdGAnWAffH-MJwvJw8c_pOPYEq=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEhhp7c4rsKzQw2GDZAA9gULqIKh11PJpkCjGyaFfCu14wlUZkWHfzUFe2L3llMcgifPzkNyBTqwjn9prk4o0xJiGrf0F3fkBFmbN8TvWPdKD6JrqcFIzF0K3TNvnatdRU9NHyQIMCIuTxHcSzd4N4zFKHKHJNGTqTEXEWc30YFaOjbZheqPW4pd8u1a=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEhP0L28cEoX6fgg18sh6oYDn7jUTqH40Uj-yQthjBisypOAwSFQf9nDhktPoJelgP0WwQMJdfYJqq1QLD2534FHIMnSO0Pk9VVyvTmagAJ_DDxK8gT2TQitb1HTIfmz6kP0LItYeGq8WfMqjxQx4XWcedVbYQP3esexr-cgOJDW_bODgD4CVj9HV6u6=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEhluDqyzX6jSeNIsMegiw6GqU4brcBnpLjIZf_jdMCZEjWa7NsV8OZpEsOsQ_DKsv1oGVDH9DTOUZJ64QE4vxviSHa-5Tvp0WhnhVxm7sskcf5AcM4Gw3LvsogL2cL-sH2wXS2x5mSRA6A_JvjXWVv8Gllejs2JT344ZxpdYvRRddiwD_PvpXmaAnvf=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEi-Rs8L_lJUq_eOghSEZNUhsXAlhjrTzsxTircn_n-kVt8z7BqGJai7B0KBLU6_7BnVD_7_3UmIlrFmHn7D-NncT3-4Aw3MgREZNZHJJ6Oi4m1VLLSBFWwsq0vnCpp17i4SBKA59pAJ7NLXh1NI5H8SC_SWdW3VpdUkWc0JrjE1y62h0_gHhNbZ4rqq=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEi7pYwbqyo_GKiny4USIwWqt6YlS8LosFZQvSZdv0uvlGvX1-OCBQ_j-vceOnQJeTuOH04t68e3WNiLJKpj7W5p3hVxMeG4kZQPePXheF-pKsfupDqVeb1cpIWdRAnDLGU4pAH11AOfU9gPO_HmIv0uynxPTh_u2zohgfZLf4e5t7kLPlx_jB0azCqF=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEiMNXAF_cR18X8yjdOiWbVpXucySW5xWFHXKCynivz-whQZYUwwzpVdLP9PWm0jKySv1hJd-zIMxDzzbN_R9O6WmFxtDGhfrC8A39V2OXMpPE0OR-hJ8b1umh-Gys_ezf3qX_Kj9hj6QVyOkpL7ihdWKWrNk6hoGTsrlj3Ia0dR8WHeCbL4b39je93a=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEi7diexbdD2nYm-aBzfLuwCkztA8t_2YOuEu64JkXqbKiJcyIBO5xqfIiroUuDNQnfZcmwSUEQHNwcW4zeun6QmE6NpZoiMJk03hqsYN13hzeab1mWNY33kYAmEYHdqnYlfL3z5jLivmabQ2TNmJt7B398puW3AGWOi4CaezyTPTX2VFAkNgs_-O3NC=s1969', 1),
('https://blogger.googleusercontent.com/img/a/AVvXsEj-Rf9Q1TXyAfgZPjIQFxKlcVjohvGSo9IE5srV4Es9maOa8hdpBkU3T4PoElAuYh2pn4NXqCfNwpKA4wVLtA5jITPxchTdnIOp7EwZQU_ZkzUoRqYFfGZYy-DmGh0s6KUeoiCVvDUYwnNTAoIDU7rDfICyveStgPXS6uWN3fI14RwsgZbuic_1Bbxr=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEh5G-bE6tBfD1siDsR2uDGF1iHEpmEsvdaFxXfEznwaQFsOw9lBKoX3YEamAOyunlLzzoLkOYbksm63hS0tOZ_a_Dw3CyMGer2wcdU5wEwAIkbTJHIrREVg13ZMI3lHmGEK2ugxYAd3Ol8coKnHQ61k8Qg_NEZtWHxtIC1eqRtTbNveFoZDOvx9UYk0=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEjOfQEkywdZF5JVVNz3Ib99hWDaYKyVuEYZh2lv400znp4YNESKXCvDJqDnvAjaBnFMAnAVcvacZJQeZDAYJKrPZz8TiYsz5xMspIXEWDK205pZUDU_qZT9JY2I0UTSZNDm7Gz_7HFXKdi8eUYTAecm7L10--ESuhmp3ST4i2fUguDouEtQ-SGcrHQK=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEj7fW3JB_32CdNviPX8X1jDUugUU_H0T0myCCmxEBQ4L959N2CnpqBDUtg3ygUIarq-6FNRq66shdgquV8HwWDqrGjCtVVVlccaRTy5re6CQ-sIy46VYtJvK7bq7iN7ZptYfAKcAU0talpjKQD0yPq_ptTvWKyMHRreoIxmDyxKLW3qr2e2T1wORzH_=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEhkRMZU8zT_VdOpBdQr0_x-JwPFlEBjylC_FSeS4D-VLZsMlXu2RG1k44svQKgDgi-4k2mFn6gkZN6mxUqXHdlcWeCKegNuXCUlOCX-E8rnHVLwZ7sr_UE1KSiJ1Lg4zFsAn8nvsCsn--WvmisO4791P7hin4mByVJFpXF1lwR8bp-VXbbpLgh4OvVD=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEi-lVxI76s15iGOPqOJb1lm9i_TkWREGmBH-KiF-JYhhhTWaA7Ky3TMEvx0S2zNq_W-V8JEBw1q3n1wg4POZMRuHfhAhcZPZDxO-OsqDbTzrtKo0YIlRqZvlfRiyPa3_NmDSyJ5QLV5buJR-D0OFfQ5gn4BDlRRfAZM46RmOJ1aiKmMEvh1r3OykN4d=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEjM_cYKtXHO9ctHp10HcVuMUhkjCRfKVSZC4lpU2iiNMiN6io6UrNBInwDH83QT08Ebci7gRbnB0x8ky1L8cDnmg8Tqhz-I1sdieNiRd8V3sSV3o9Fah1xZvEPi9H0aTXm6xpNrQwBtpItS3BLcp6AxO-x0kUay1nx3RvoUOHsbiACYLzPGuwxNATa0=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEjxpbAuYc2zP0ASRcC2--XclMC0LwzfyMn8iQYhbplYU3jj6q9GhVDZAfA9rvfvo8Vzay4iwtqH-iaCv6l7W6tayTJEVbPliauz28Hf8dwlCRfoczT2zrXelq1U6SCfaF7DTE4Ukny3dBJP8E49lftw5yym8GAv_mBbmoKCkLtHm8-GyZ9RPyAzkST1=s1969', 2),
('https://blogger.googleusercontent.com/img/a/AVvXsEjGgMDl1W6DHtwrlAsFpbuUKQeNRe0DNn2v5aTpIUojsrjioxLGvKfhEXDdqDh3Ofm0YO4rJbTeVWDxT_l4QQXPvwJSQ69YMJPqImZ_Yao7C-06eyh2iQFtGl4vg6gLrXaY-ByvuGvDbnDM_NaHp83ccz5S_z0I8bHBveCH_GMdhvehoBQVkkuIlqbH=s1969', 2)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',3)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',4)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',5)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',6)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',7)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',8)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',9)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',10)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',11)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhLaUDSFLLUlU44PGuNb6JmmVm5pReGU8xIWRaLSJc7Y3TGDX78fq5n50n-8YdMNSBJmg1FWqDAdPA5ko9WVhTT4kaVIAgzI3NM2UkC7JKwiN_yobox81mKOAth2yr--eT2PIFppyjcRRH0ub2qJOiGQyjwOp8i-7EtSG8A7FIwFOM1Ox5bz8wEudev=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg5xRhLzIDPEdn-RCLRjKajsNDUFAab5Ui8XN8pJUO_wD65khiqn0fWNg8FjrrVzeQO6nqH5WviZpP089hqv47QHm6rgYFccrg1xzNzbsZ8_E0OYtoQ9HGY5s5YknGj6o5MJufPg1wJYL17x-MWawb4FTY4Lpgq_vml-0rfMr9p9nqC22ZlV2N8tfsW=s2000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEjykpzNESzHpTeyNdGICUrdHO9CRG3kRwp2QkA3GBaeRx-Bru55LF_fNVccbFSqvt2eHFodcpWgZMkg4LFReizDYQIMQLfUFirjsx59ejxLbQt307wymKsWvADXXuWJieQ4zCCyKneGXCYzuwvWi13YzV4QsdcX7E5SPGZdmtFxMGaRzIDob-Oxstmv=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhN90UEmtvbPsZf_OEuZWcYP1a5VxTw-zlHcphIC8vK_b_6Ycl628NErEAzjkdACk0_dIvTH4c3TNr10nla8SwaKgxUMMkAA6rpyc5mygvldtwXRPTbM-D1eK8WDlnCD5x_OiXq0EAGwebUenydBCTdyIdqPZKTjltkzVlJuSsmYiBh63_5EAMdsydK=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhn8AtvP7OppwyxlG4W3Xtt8ba_PeA-S-vezYaSaFlivpxDpzzX5d93wB-6eViqQqUQLZjKmYLxpr0xOzdBftGUJm5zfUfWECPQ-4WODieU0a4PQYVuquTE0K6atC3FR5Z9ZBjuXaaK7w3RXGuJdcE2p5uFGWYbwdyOVDjz972P6y74_cPVB6jxuf9v=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgM7gIJuK0e3tp5UrVPz2E2uk0W8GtJLIvs8nwx8l7LbqcVuQsslFKTYPggTLoF7LoDk60DAb13SuJD8r626g5srMSHQxNBcsLXKpw7u4778rbfwhgLbd7eXW1csY-eijn5p36l0NiLSavaS-w18FlMHEWftrBs4VlCwvc5wkKXl2xaSzLeyIpMlS07=s2000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEimLaU1SH1S7BrZqgG8kklCWcendObhq2G1RgkK_bjyTwtQOjFC7zmx2fNTNa-G2tF0ERFgYeO4eN9gS5LYv5KBj9pHqcwavhI0mL7KN4Mb_6q6M0rhg6tCLU3eUoPifmZsGAjzZpyfTec9H_B89RWPvR6g4SLyDeYRl-wXu-obD3myynU8i8rrReSh=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEg64-cATUiOFUbx3v4pd_IgGVR2jzzRLzdJ1Z5UCoDe5xsVGEyaXQg3OQ70j33gfLmCP3Dn598K-sHkYNcQwCb1i95KT5EJAo1uG5AmRwTlPvDmKMkc1E3T75K942LuxYyQmr9quBg3vVXEf9u457RYVWNKMSnXW88Nyjdg6ZacY6BTBr3rCNTk8kwt=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEiPHLJ9YeIVtjBQXs7YfHKbIXt4EnZRtLUIawvGuufAg0BoWlCf8lsJYMIzXVvmlgA-r0UGgF-DbjOi-fUhMpeph-Cq-ysawxLxFREOhQbPvBlnljaeAGuZeL2XSTXqbLG9Q5rcw11DN8Sp6bzz0SMG4s5kbcbzjq_r7wA6cf-8VDrg8wou8_NKnawx=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj8T9_bBmuX4gWxVfNNXPaV0QavkKnQGEet8BNuO9yHt1S7XlML5IVBbkfTFiHCloSVWyJ7rC3LO3MMy2wjCPfV-8jh986XVHwQ2cTkVfPdVICZt4gKhfmZQIOlCTfgvMUE1HUc6ptuqO1d-xvhYTyYiJuzoi6rH1gRk0SVDMXDUyAdVjPxK4MyJb7A=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEhROZlj1fl0tCn3jojJW_d3f9Me8SfmzLN8NmWBeaP9S3_PvMVl4EkXjzKJBnuBY27FZR1Hr0B0g6PeFH9zsxcU3ZLwpJnt0g5xgix0t3GYvdmPAncsVUBSvJ_xQdD6X9MAoBDRkYDIKRqn2XFq-ypSRGQTB-L6FTyQ2BNqRjG8Wdp9zSrqL8xWvUzA=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEj_jym81Qrm82ORuLlNtbtFts2v18zf-LrIEUYmrf7IPXlWv0F808CNHBwvlVFLmfVTZRFPRu7SDEGAmOQPPrs-nSAHz7V8hbg9EjF-zeopidZAM0rcoZ5jIjvqKSx5D_ddGJR1eFYESDWSnyZUCHInIjBUwN5YqA-UGuf4E5Yw1RGtiEqcToyr7eDO=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgL3j-7b9FM0Vidbn3gyUnHV9vvkqHDC4zzKK8ndnBZin25rk5ervtx8aBac1zPGJVuhHwa3TOLeQQTmnsGcMOOCBV7SRFB6r-AW1p6OzIxeTNmGJInNkMSF3lHvU5DD8zboN9SCmSdcSstBzX0InskUI0AndfYCnlZtfGNKB5WYb9ccFDB_eY4y4mb=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEioz0c3MAHYSEWmDNsMp0tb1qQG04YWHeCh-LYX_R5MFs31NiC9lMj-urlz8eXC2Q2XiSgoULoO__kBSNWRJCJqyqLUbbzyOvYrabIHDRzyR-rY9A1-ajVEgfm6UGIU4JHrFCy3PcFygj2bjmNv4sOFYPKYvX4C3rI9cuvXmeyzOR13sMyAZELqrulS=s16000',12)
,('https://blogger.googleusercontent.com/img/a/AVvXsEgK3opBHuvMMMEIhydRzx4X2UWb-LgJbK6U0pLxAJOkGDCFWgcbypf8KjgwvM4PYJ_AsW8cP91-qf3VZ1dhFYL02AU-IWKutNtXUWdpb1CkmhqsZOz7ai-undezzp_BNaSKufKYQnuhaIjNsmWhETJP6D35fZcZT2Eo4vQNLVIReGUq_gyI8QngDcI1=s16000',12)

;

INSERT INTO theodoi (idnguoidung, idtruyen) VALUES 
(1, 1)
,(2, 1)
,(3, 1)
,(4, 1)
,(5, 1)
,(1,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(4,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(1,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(4,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(1,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(4,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(1,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(4,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(1,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(2,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(3,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(4,FLOOR(RAND() * (20 - 1 + 1) + 1))
,(5,FLOOR(RAND() * (20 - 1 + 1) + 1))
;

INSERT INTO luotxem (idnguoidung, idchuong, ngayxem) 
VALUES 
(1, 1, '2022-12-01 12:00:00')
,(1, 2, '2022-12-01 12:00:00')
,(1, 3, '2022-12-01 12:00:00')
,(1, 4, '2022-12-01 12:00:00')
,(1, 5, '2022-12-01 12:00:00')
,(1, 6, '2022-12-01 12:00:00')
,(1, 7, '2022-12-01 12:00:00')
,(1, 8, '2022-12-01 12:00:00')
,(1, 9, '2022-12-01 12:00:00')
,(2, 1, '2022-12-01 12:00:00')
,(2, 1, '2022-12-01 12:00:00')
,(3, 1, '2022-12-01 12:00:00')
,(4, 1, '2022-12-01 12:00:00')
,(4, 5, '2022-12-01 12:00:00')
,(4, 9, '2022-12-01 12:00:00')
,(4, 8, '2022-12-01 12:00:00')
,(5, 5, '2022-12-01 12:00:00')
,(5, 2, '2022-12-01 12:00:00')
,(5, 8, '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), '2022-12-01 12:00:00')
;

INSERT INTO danhgia (idnguoidung, idtruyen, sosao) VALUES 
(1, 1, 5)
,(1, 2, 4)
,(1, 3, 3)
,(1, 4, 2)
,(1, 5, 1)
,(2, 1, 4)
,(2, 2, 2)
,(3, 3, 3)
,(4, 2, 5)
,(5, 5, 5)
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))
,(FLOOR(RAND() * (5 - 1 + 1) + 1),FLOOR(RAND() * (20 - 1 + 1) + 1), FLOOR(RAND() * (5 - 1 + 1) + 1))

;


INSERT INTO binhluan (idnguoidung, idtruyen, noidung, ngaybinhluan) VALUES 
(4, 1, 'Đỉnh thật sự', now())
,(2, 1, 'Hay ghê á!!!!!!', now())
,(3, 1, 'Quá ghê gớm!!!!!!', now())
,(4, 1, 'Đỉnh thật sự', now())
,(5, 1, 'Tuyệt vời ông mặt trời :))', now())
,(1, 2, 'Hay ghê á!!!!!!', now())
,(2, 3, 'Hay ghê á!!!!!!', now())
,(3, 4, 'Hay ghê á!!!!!!', now())
,(4, 5, 'Hay ghê á!!!!!!', now())
,(5, 6, 'Hay ghê á!!!!!!', now())
,(1, 7, 'Hay ghê á!!!!!!', now())
,(2, 8, 'Hay ghê á!!!!!!', now())
,(3, 9, 'Hay ghê á!!!!!!', now())
,(4, 10, 'Hay ghê á!!!!!!', now())
,(5, 11, 'Hay ghê á!!!!!!', now())
,(1, 12, 'Hay ghê á!!!!!!', now())
,(2, 13, 'Hay ghê á!!!!!!', now())
,(3, 14, 'Hay ghê á!!!!!!', now())
,(4, 15, 'Hay ghê á!!!!!!', now())
,(5, 16, 'Hay ghê á!!!!!!', now())

;


