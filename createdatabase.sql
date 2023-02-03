--
-- alter user 'root'@'localhost' identified with mysql_native_password by 'root123';
-- create database sql12595280;
use sql12595280;
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
('Nanase-san no Koi ga Ijou 2', 'Cô nàng cuồng tình Nanase', 1, 'Takahashi đã gặp được Nanase, một cô gái dễ thương và trong sáng thông qua ứng dụng hẹn hò. Quan hệ của cả hai ngày càng tiến triển một cách tốt đẹp rồi bỗng dưng một ngày nọ Takahashi được Nanase mời tới nhà mình chơi và chứng kiến một cảnh tượng bất ngờ', 'https://st.nettruyenup.com/data/comics/46/co-nang-cuong-tinh-nanase.jpg')
,('D-kyuu Boukensha No Ore, Naze Ka Yuusha Party Ni Kanyuu Sareta Ageku, Oujo Ni Tsukima Towareteru','Tôi là một Nhà thám hiểm hạng D, vì một số lý do mà tôi đã được tuyển dụng vào một đảng anh hùng, và bây giờ công chúa đang theo dõi tôi', 1,'Nếu bạn trở thành một anh hùng và đánh bại Quỷ Vương, một cuộc sống nhàn hạ đang chờ bạn ...! Đây là điều mà chàng trai trẻ Jirei tin tưởng, và anh ấy đã làm việc chăm chỉ cả ngày lẫn đêm để đạt được mục tiêu của mình. Tuy nhiên, khi phát hiện ra rằng những anh hùng đánh bại Quỷ Vương là những người đang làm tất cả những công việc khó khăn, anh ta đã bỏ chạy. Nhưng những cô gái mà Jirei đã cứu trong cuộc hành trình của anh ấy trước khi anh ấy biết điều đó lần lượt đổ về để giành lấy trái tim và thể xác của anh ấy ...?','https://st.nettruyenup.com/data/comics/195/d-kyuu-boukensha-no-ore-naze-ka-yuusha-p-9809.jpg')
,('Fantasy Bishoujo Juniku Ojisan To','', 1,'Câu truyện hài lãng mãn của cặp đôi bạn thân. Một trung niên và một đã từng là trung niên','https://st.nettruyenup.com/data/comics/60/fantasy-bishoujo-juniku-ojisan-to.jpg')
,('The Fragrant Flower Blooms With Dignity - Kaoru Hana Wa Rin To Saku','Những đóa hoa thơm nở diễm kiều, Kaoru Hana Wa Rin To Saku', 1,'Ở một nơi nào đó, có 2 trường cao trung lân cận. Cao trung Chidori, một trường nam sinh cấp thấp hội tụ đủ những thằng đần, trường nữ sinh Kikyo, một trường nữ sinh danh giá . Rintaro Tsugumi, một nam sinh năm 2 to khỏe và trầm tính tại trường Chidori, bắt gặp Kaoruko Waguri, một khách hàng khi cậu đang giúp việc tại cửa hàng bánh nhà mình . Rintaro cảm thấy thoải mái khi dành thời gian bên Kaoruko, nhưng cô lại là học sinh của trường Kikyo, ngôi trường hàng xóm cực kì căm ghét trường Chidori. Đây là câu chuyện về 2 con người ở rất gần nhưng lại rất xa','https://st.nettruyenup.com/data/comics/177/the-fragrant-flower-blooms-with-dignity-4746.jpg')
,('Ningen Fushin No Boukenshatachi Ga Sekai O Sukuu Youdesu ','', 1,'Câu chuyện về bốn nhà thám hiểm, tất cả những người đã trải qua sự phản bội và khó khăn, cùng nhau vươn lên trong xã hội. Nhóm dịch : Sứa fuho team','https://st.nettruyenup.com/data/comics/227/ningen-fushin-no-boukenshatachi-ga-sekai-9739.jpeg')
;

INSERT INTO tacgia (tentacgia) VALUES 
('Shinonome Toru')
,('Âu Bát Bát')
,('Jyabachip')
,('Yuuichi Katou')
,('Shiroao Toraneko')
,('Tsurusaki Yuu')
,('Mikami Saka')
,('Masaki Kawakami')
,('Shinta Fuji')
;

INSERT INTO ct_tacgia (idtruyen, idtacgia) VALUES 
(1,1)
,(2,5)
,(3,6)
,(4,7)
,(5,8)
,(5,9)
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
(4,6)
,(4,11)
,(4,21)
,(4,31)
,(4,32)
,(1,6)
,(1,11)
,(1,21)
,(1,30)
,(1,31)
,(1,34)
;

INSERT INTO chuong (tenchuong, sochuong, ngaycapnhat, idtruyen) 
VALUES 
('Chapter 1: Cô gái tên Nanase', 1, '2022-01-01 12:00:00', 1)
,('Chapter 2: Nô lệ của công ty mất nhà', 2, '2022-12-02 12:00:00', 1)
,('Chapter 3: Em yêu anh vì XX', 3, '2022-12-03 12:00:00', 1)
,('Chapter 4: Hình phạt của Nanase', 4, '2022-12-04 12:00:00', 1)
,('Chapter 5: Cuộc viếng thăm bất ngờ của cô em gái', 5, '2022-12-05 12:00:00', 1)
,('Chapter 1', 1, '2022-12-05 12:00:00', 2)
,('Chapter 1', 1, '2022-12-15 12:00:00', 3)
,('Chapter 1', 1, '2022-12-08 12:00:00', 4)
,('Chapter 1', 1, '2022-12-25 12:00:00', 5)
;

INSERT INTO image_chuong (imagelink, idchuong) 
VALUES 
('https://i225.ntcdntempv26.com/data/images/55854/807884/003.jpg?data=net', 1),
('https://i225.ntcdntempv26.com/data/images/55854/807884/004.jpg?data=net', 1),
('https://i225.ntcdntempv26.com/data/images/55854/807884/005.jpg?data=net', 1),
('https://i225.ntcdntempv26.com/data/images/55854/807884/006.jpg?data=net', 1),
('https://i225.ntcdntempv26.com/data/images/55854/807884/007.jpg?data=net', 1)
;

INSERT INTO theodoi (idnguoidung, idtruyen) VALUES 
(1, 1)
,(2, 1)
,(3, 1)
,(4, 1)
,(5, 1)
,(1, 2)
,(2, 2)
,(3, 3)
,(4, 3)
,(5, 3)
,(1, 4)
,(2, 5)
,(3, 5)
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
;

select * from truyen
