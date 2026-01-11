import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/profileService";
import { updateImage, updateProfile } from "../services/accountService";

import DefaultImage from "../assets/ProfilePhoto.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import EditImage from "../assets/EditImage.png";

function Account() {
	const navi = useNavigate();
	const disp = useDispatch();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [profileImage, setProfileImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [email, setEmail] = useState("");

	const [isEditing, setIsEditing] = useState(false); // for editing

	const [originalImage, setOriginalImage] = useState(null);

	const fileInputRef = useRef(null);


	// get profile 
	useEffect(() => {
	const fetchProfile = async () => {
		try {
				const profile = await getProfile();
				setEmail(profile.email);
				setFirstName(profile.first_name || "");
				setLastName(profile.last_name || "");
				setImagePreview(profile.profile_image || null);
				setOriginalImage(profile.profile_image || null); // prevent image change to default image
		} catch (error) {
				if (error.message === "UNAUTHORIZED") {
				navi("/login");
				}
		} finally {
				setLoading(false);
		}
	};

	fetchProfile();
	}, [navi]);

	// image change/upload
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		//  validate JPEG or PNG 
		if (!["image/jpeg", "image/png"].includes(file.type)) {
		alert("Format image harus JPEG atau PNG");
		e.target.value = "";
		return;
		}

		// validate size 100 KB
		if (file.size > 102400) {
		alert("Maksimal ukuran gambar adalah 100 KB");
		e.target.value = "";
		return;
		}

		setProfileImage(file);
		setImagePreview(URL.createObjectURL(file));
	};
	console.log(DefaultImage);


	// update name n image
	const handleSave = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
		// Update name
		await updateProfile(firstName, lastName); // from accountService.js

		// Update image if selected
		if (profileImage) {
				const updated = await updateImage(profileImage); // from accountService.js
				setOriginalImage(updated.profile_image);
  			setImagePreview(updated.profile_image);
		}
		alert("Profile berhasil diperbarui");
		setIsEditing(false);
		setProfileImage(null);
		} catch (error) {
		if (error.message === "UNAUTHORIZED") {
				navi("/login");
		} else {
				alert(error.message || "Terjadi kesalahan");
		}
		} finally {
		setSaving(false);
		}
	};

	// get default image or api image
	const imageSrc = imagePreview || DefaultImage;

	// logout
	const handleLogout = () => {
	disp(logout());
	navi("/login");
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="bg-amber-0 flex flex-col items-center h-screen">

			<div className="flex flex-col items-center text-center space-y-3 ">
				<div className="relative">
					<img
						src={imagePreview || imageSrc}
						alt="Profile"
						className="w-30 rounded-full object-cover"
					/>

					{isEditing && (
						<button
							type="button"
							onClick={() => fileInputRef.current.click()}
							className="absolute bottom-0 right-0 bg-white border border-[#C6C0C0] rounded-full p-2 shadow"
						>
							<img
							src={EditImage}
							className="w-3" 
							/>	
						</button>
					)}
				</div>

				<p className="font-semibold text-2xl">
					{firstName} {lastName}
				</p>

				{/* Hidden file input */}
				<input
					ref={fileInputRef}
					type="file"
					accept="image/jpeg,image/png"
					onChange={handleImageChange}
					className="hidden"
				/>
			</div>
			
			<form 
				onSubmit={handleSave}
				className="w-2xl space-y-5"
			>
				<div className="flex flex-col gap-y-2">
						<label>Email</label>
						<input
								type="email"
								value={email}
								disabled
								className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
						/>
				</div>
				<div className="flex flex-col gap-y-2">
					<label>Nama depan</label>
						{isEditing ? (
								<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
								className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
								/>
						) : (
							<input
							value={firstName}
							className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
							/>
						)}
				</div>
				<div className="flex flex-col gap-y-2">
						<label>Nama belakang</label>
						{isEditing ? (
								<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md"
								/>
						) : (
								<input
								value={lastName}
								className="border border-[#C6C0C0] focus:border-[#F13B2F] outline-none p-2 rounded-md" 
								/>
						)}
				</div>

				{!isEditing ? (
					<div className="flex flex-col space-y-5">
						<button 
						onClick={() => setIsEditing(true)}
						className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60] "
						>
								Edit
						</button>
						<button
						onClick={handleLogout}
						className="border border-[#F13B2F] text-[#F13B2F] flex rounded-md p-2 justify-center "
						>
							Logout
						</button>
					</div>
					) : (
					<>
						<div className="flex flex-col space-y-5">
							<button
							type="submit"
							disabled={saving}
							className="bg-[#F13B2F] flex rounded-md p-2 justify-center text-white hover:bg-[#F45E60] "
							>
							{saving ? "Saving..." : "Save"}
							</button>
							<button
							type="button"
							onClick={() => {
								setIsEditing(false);
								setImagePreview(originalImage);
								setProfileImage(null);
							}}
							className="border border-[#F13B2F] text-[#F13B2F] flex rounded-md p-2 justify-center "
							>
							Cancel
							</button>
						</div>
					</>
				)}
			</form>
		</div>
	);
}

export default Account;
