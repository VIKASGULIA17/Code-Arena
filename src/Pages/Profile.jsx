import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Trophy,
  Zap,
  Bug,
  Globe,
  Lock,
  MapPin,
  School,
  BarChart3,
  User2,
  Camera,
  X,
  Trash2,
} from "lucide-react";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { EnhancedNavbar } from "../components/Navbar";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Donut = ({ percent = 0, color = "#4f46e5" }) => {
  const radius = 42;
  const stroke = 10;
  const c = 2 * Math.PI * radius;
  const dash = (percent / 100) * c;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="64"
        textAnchor="middle"
        className="fill-zinc-700 dark:fill-zinc-200"
        fontSize="18"
        fontWeight="700"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
};

const Profile = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { getUserProfileData, getUserData, userProfile, jwtToken, allProblem, avatar } = useAppContext();

  const [uniqueSubmissions, setUniqueSubmissions] = useState([]);

  const solved = useMemo(() => {
    if (!allProblem) return [];
    return allProblem.filter((p) => {
      if (p.status === true) return true;
      if (uniqueSubmissions && uniqueSubmissions.length > 0) {
        return uniqueSubmissions.some(sub => {
          if (typeof sub === 'object') {
            return sub.problemId == p.id || sub.id == p.id;
          }
          return sub == p.id;
        });
      }
      return false;
    });
  }, [allProblem, uniqueSubmissions]);

  const total = allProblem?.length || 0;

  const [confirmDelete, setConfirmDelete] = useState("");
  const easy = useMemo(
    () => (allProblem || []).filter((p) => p.difficulty === "Easy"),
    [allProblem],
  );
  const medium = useMemo(
    () => (allProblem || []).filter((p) => p.difficulty === "Medium"),
    [allProblem],
  );
  const hard = useMemo(
    () => (allProblem || []).filter((p) => p.difficulty === "Hard"),
    [allProblem],
  );
  const navigate = useNavigate();


  const fetchUniqueSubmissions = async () => {
    const token = jwtToken;
    if (!token) {
      console.log("No token found");
      return;
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/submission/getStatusOfUserProblems`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Submissions fetched successfully:", response.data);
      setUniqueSubmissions(response.data)
    } catch (error) {
      console.error("Failed to fetch submissions:", error);

    }
  };

  const solvedEasy = solved.filter((p) => p.difficulty === "Easy").length;
  const solvedMed = solved.filter((p) => p.difficulty === "Medium").length;
  const solvedHard = solved.filter((p) => p.difficulty === "Hard").length;
  const [avatarMedia, setAvatarMedia] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);// for paginatoin 
  const itemsPerPage = 10;

  const [IsDeleteOpen, setIsDeleteOpen] = useState(false);

  const solvedPercent = total ? (solved.length / total) * 100 : 0;

  // console.log(userProfile)

  const LANG_COLORS = {
    python: "bg-blue-100 text-blue-700 border-blue-200",
    "c++": "bg-purple-100 text-purple-700 border-purple-200",
    js: "bg-yellow-100 text-yellow-700 border-yellow-200",
    java: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const LANG_LABELS = {
    python: "Python",
    "c++": "C++",
    js: "JavaScript",
    java: "Java",
  };

  const AVATAR_OPTIONS = [
    // Toon Heads
    "https://api.dicebear.com/9.x/toon-head/svg?seed=hello",
    "https://api.dicebear.com/9.x/toon-head/svg?seed=ava",
    "https://api.dicebear.com/9.x/toon-head/svg?seed=Max",

    // Fun Emojis
    "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Joy",
    "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Cool",
    "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Star",

    // Bottts (Neutral)
    "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Terminator",
    "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=R2D2",

    // A few more colorful ones
    "https://api.dicebear.com/9.x/toon-head/svg?seed=Luna",
    "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Nerd",
    "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Bender",
  ];

  const STATUS_CONFIG = {
    ACCEPTED: {
      label: "Accepted",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      badge: "bg-green-100 text-green-700 border-green-300",
      glow: "shadow-green-100",
    },
    WRONG_ANSWER: {
      label: "Wrong Answer",
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-200",
      badge: "bg-red-100 text-red-700 border-red-300",
      glow: "shadow-red-100",
    },
    TIME_LIMIT_EXCEEDED: {
      label: "Time Limit Exceeded",
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
      glow: "shadow-yellow-100",
    },
    COMPILATION_ERROR: {
      label: "Compilation Error",
      icon: AlertTriangle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      badge: "bg-orange-100 text-orange-700 border-orange-300",
      glow: "shadow-orange-100",
    },
  };
  // console.log(userProfile);

  const [isEditOpen, setisEditOpen] = useState(false);

  const handleEditDialogBox = () => {
    setisEditOpen(true);
  };

  const saveUpdateToSpringMongo = async (values) => {
    const formData = new FormData();
    formData.append("userProfileJson", JSON.stringify(values));

    if (avatarMedia != null) formData.append("avatarMedia", avatarMedia);
    else if (
      values.avatarLink != null &&
      values.avatarLink.length > 0 &&
      values.avatarLink
    )
      formData.append("cloudinaryLink", values.avatarLink);

    const res = await axios.post(
      `${BACKEND_URL}/userProfile/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  };

  const handleDeleteUserProfile = async () => {
    try {
      const result = await axios.delete(`${BACKEND_URL}/userProfile/delete`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      const res = result.data;
      if (res.status == 1) {
        toast.success(`User Profile deleted..`);
        getUserProfileData();
        getUserData();
      }
    } catch (e) {
      toast.error(`User Profile not deleted`);
    }
  };

  // console.log(userProfile?.avatarLink);

  const handleSubmit = async (values, helper) => {
    // console.log("values is : ");
    // console.log(values);
    try {
      const result = await saveUpdateToSpringMongo(values);
      if (result.status === 1) {
        // toast.success(`User Profile updated..`);
        helper.resetForm();
        setisEditOpen(false);
        setAvatarMedia(null);
        // console.log("Function calling...");
        getUserProfileData(); // to reflect the changes in profile page after update
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error(`Profile not updated`);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/submission/getAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      const sortedData = response.data.sort((a, b) => { // sort based on date 
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      });
      setSubmissions(sortedData);
      console.table(sortedData)
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchUniqueSubmissions();
  }, [userProfile]);

  // Calculation indices for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  return (
    <>
      <ToastContainer />
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setisEditOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button
                onClick={() => setisEditOpen(false)}
                className="text-zinc-500  hover:text-zinc-700"
              >
                ✕
              </button>
            </div>

            <Formik
              enableReinitialize
              initialValues={{
                bio: userProfile?.bio || "",
                fullName: userProfile?.fullName || "",
                username: userProfile?.username || "",
                location: userProfile?.location || "",
                schoolName: userProfile?.schoolName || "",
                gender: userProfile?.gender || "",
                avatarLink: userProfile?.avatarLink || "",
                websiteLink: userProfile?.websiteLink || "",
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* User Name */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium" htmlFor="username">
                        Username
                      </label>
                      <Field
                        id="username"
                        name="username"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={
                          userProfile?.username
                            ? userProfile?.username
                            : "JohnDoe_123"
                        }
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium" htmlFor="fullName">
                        Full Name
                      </label>
                      <Field
                        id="fullName"
                        name="fullName"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={
                          userProfile?.fullName
                            ? userProfile?.fullName
                            : "John Doe"
                        }
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* Bio */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-sm font-medium" htmlFor="bio">
                        Bio
                      </label>
                      <Field
                        as="textarea"
                        id="bio"
                        name="bio"
                        rows="3"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tell something about yourself"
                      />
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* School Name */}
                    <div className="space-y-1">
                      <label
                        className="text-sm font-medium"
                        htmlFor="schoolName"
                      >
                        School Name
                      </label>
                      <Field
                        id="schoolName"
                        name="schoolName"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={
                          userProfile?.schoolName
                            ? userProfile?.schoolName
                            : "MIT"
                        }
                      />
                      <ErrorMessage
                        name="schoolName"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium" htmlFor="location">
                        Country
                      </label>
                      <Field
                        id="location"
                        name="location"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={
                          userProfile?.location
                            ? userProfile?.location
                            : "United States"
                        }
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* Avatar Selection Grid */}
                    <div className="sm:col-span-2 space-y-3">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Pick Your Character
                      </label>

                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="relative aspect-square rounded-xl border-2 transition-all duration-200">
                          <img
                            alt="current avatar profile image"
                            className="aspect-square rounded-xl object-cover h-full w-full"
                            src={values.avatarLink}
                          />
                          <input
                            type="file"
                            id="inputAvatar"
                            accept="image/*"
                            alt="Current avatar profile image"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setAvatarMedia(file);
                              setFieldValue(
                                "avatarLink",
                                URL.createObjectURL(file),
                              );
                            }}
                          />
                          <label
                            htmlFor="inputAvatar"
                            className="ml-3 absolute -bottom-2 -right-2 bg-blue-600 p-1 hover:bg-blue-700 cursor-pointer rounded-full text-white"
                          >
                            <Camera size={16} />
                          </label>
                        </div>
                        {AVATAR_OPTIONS.map((url) => (
                          <button
                            key={url}
                            type="button"
                            onClick={() => {
                              setFieldValue("avatarLink", url);
                            }}
                            className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${values?.avatarLink === url
                                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500/20"
                                : "border-transparent bg-white dark:bg-zinc-900 hover:border-zinc-300"
                              }`}
                          >
                            <img
                              src={url}
                              alt="avatarLink"
                              className="aspect-square rounded-xl w-full h-full object-contain p-1"
                            />

                            {values?.avatarLink === url && (
                              <div className="absolute top-1 right-1 bg-indigo-600 rounded-full p-0.5 shadow-sm">
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={4}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      <ErrorMessage
                        name="avatarLink"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>

                    {/* Website Link */}
                    <div className="sm:col-span-2 space-y-1">
                      <label
                        className="text-sm font-medium"
                        htmlFor="websiteLink"
                      >
                        Website Link
                      </label>
                      <Field
                        id="websiteLink"
                        name="websiteLink"
                        className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={
                          userProfile?.websiteLink
                            ? userProfile?.websiteLink
                            : "https://your.site"
                        }
                      />
                      <ErrorMessage
                        name="websiteLink"
                        component="div"
                        className="text-xs text-rose-600"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex w-full justify-between">
                    <div>
                      <Button
                        type="button"
                        onClick={() => setIsDeleteOpen(true)}
                        className="bg-red-100 text-red-700 hover:bg-zinc-200 dark:bg-red-800 dark:text-red-200 dark:hover:bg-zinc-700"
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        onClick={() => setisEditOpen(false)}
                        className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {/* <AnimatePresence */}
      {/* </div> */}
      <div className="p-6 bg-linear-to-b from-violet-50/60 to-blue-50/60 dark:from-zinc-900 dark:to-zinc-950 min-h-screen">
        <EnhancedNavbar />
        <div className="max-w-7xl mt-17 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center gap-4">
                <img
                  src={
                    avatar || userProfile?.avatarLink || "https://i.pravatar.cc/100?img=5"
                  }
                  alt="avatar"
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div>
                  <div className="inline-flex items-center gap-2">
                    <h2 className="text-lg font-bold">
                      {userProfile?.fullName}
                    </h2>
                  </div>
                  <p className="text-xs text-indigo-600">
                    {userProfile?.username}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                {userProfile?.bio}
              </p>
              <Button
                onClick={handleEditDialogBox}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Edit Profile
              </Button>
              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Rank{" "}
                  <span className="ml-auto font-semibold">
                    #{userProfile?.overallRank}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Country{" "}
                  <span className="ml-auto font-semibold">
                    {userProfile?.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4" /> School{" "}
                  <span className="ml-auto font-semibold">
                    {userProfile?.schoolName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Link{" "}
                  <span
                    onClick={() => navigate(userProfile?.websiteLink)}
                    className="ml-auto font-semibold hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {userProfile?.websiteLink}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="font-semibold mb-4">Languages</h3>
              <div className="space-y-4">
                {[
                  { name: "Python", pct: 75, color: "bg-emerald-500" },
                  { name: "C++", pct: 45, color: "bg-sky-500" },
                  { name: "JavaScript", pct: 30, color: "bg-amber-500" },
                ].map((l) => (
                  <div key={l.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{l.name}</span>
                      <span>{l.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${l.color}`}
                        style={{ width: `${l.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <User2 className="h-4 w-4 text-emerald-600" /> 15.2k{" "}
                  <span className="text-zinc-500">Profile views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-indigo-600" /> 1,250{" "}
                  <span className="text-zinc-500">Reputation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" /> 85{" "}
                  <span className="text-zinc-500">Discussions</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Solved Problems</h3>
                    <p className="text-xs text-zinc-500">Total solved</p>
                  </div>
                  <div className="text-3xl font-extrabold">{solved.length}</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 items-center">
                  <Donut percent={solvedPercent} />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />{" "}
                      Easy{" "}
                      <span className="ml-auto">
                        {solvedEasy} / {easy.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-amber-500" />{" "}
                      Medium{" "}
                      <span className="ml-auto">
                        {solvedMed} / {medium.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500" /> Hard{" "}
                      <span className="ml-auto">
                        {solvedHard} / {hard.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Contest Rating</h3>
                    <p className="text-xs text-emerald-600">Top 5%</p>
                  </div>
                  <div className="text-3xl font-extrabold">1,850</div>
                </div>
                <div className="mt-6 h-28 w-full rounded-lg bg-linear-to-t from-indigo-50 to-white dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end gap-2 p-3">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-500/20 rounded-t"
                        style={{ height: `${30 + ((i * 5) % 70)}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="font-semibold">Submission Activity</h3>
              <MonthActivityGrid submissions={submissions} />
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Badges & Achievements</h3>
                <button className="text-xs text-indigo-600">View All</button>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-orange-50 text-orange-600">
                  <Trophy className="h-8 w-8" />
                  <p className="mt-2 text-sm font-medium">Winner 2023</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-blue-50 text-blue-600">
                  <Zap className="h-8 w-8" />
                  <p className="mt-2 text-sm font-medium">100 Streak</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-violet-50 text-violet-600">
                  <BarChart3 className="h-8 w-8" />
                  <p className="mt-2 text-sm font-medium">Problem Solver</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-emerald-50 text-emerald-600">
                  <Bug className="h-8 w-8" />
                  <p className="mt-2 text-sm font-medium">Bug Hunter</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-zinc-100 text-zinc-400">
                  <Lock className="h-8 w-8" />
                  <p className="mt-2 text-sm font-medium">Locked</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Submissions</h3>
                <span className="text-xs text-zinc-400">
                  {submissions.length} total
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-zinc-500 border-b border-zinc-200 dark:border-zinc-700">
                    <tr>
                      <th className="pb-2 font-medium">Problem</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Language</th>
                      <th className="pb-2 font-medium">Time</th>
                      <th className="pb-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-10 text-center text-zinc-400 text-xs"
                        >
                          No submissions yet
                        </td>
                      </tr>
                    ) : (
                      currentSubmissions.map((sub, idx) => {
                        const cfg =
                          STATUS_CONFIG[sub.status] ||
                          STATUS_CONFIG.WRONG_ANSWER;
                        const langLabel =
                          LANG_LABELS[sub.language] || sub.language;
                        const hasSlug = sub.slug && sub.slug !== "null";

                        const rawProblemId =
                          typeof sub.problemId === "object" &&
                            sub.problemId !== null
                            ? sub.problemId.$oid ||
                            sub.problemId.id ||
                            sub.problemId._id ||
                            JSON.stringify(sub.problemId)
                            : sub.problemId;

                        const problemInfo = (allProblem || []).find(
                          (p) => String(p.id) === String(rawProblemId),
                        );

                        // 2. Safely extract the title, with a fallback just in case it's missing
                        const problemName =
                          problemInfo?.title ||
                          `Unknown Problem (${rawProblemId})`;

                        const formattedDate = sub.submittedAt
                          ? new Date(sub.submittedAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "—";

                        const rowContent = (
                          <>
                            <td className="py-3 pr-4 font-medium text-zinc-700 dark:text-zinc-200">
                              {problemName}
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${cfg.badge}`}
                              >
                                {cfg.label}
                              </span>
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${LANG_COLORS[sub.language] || "bg-gray-100 text-gray-600 border-gray-200"}`}
                              >
                                {langLabel}
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-zinc-500">
                              {sub.time != null ? `${sub.time} ms` : "—"}
                            </td>
                            <td className="py-3 text-zinc-400 whitespace-nowrap">
                              {formattedDate}
                            </td>
                          </>
                        );

                        return hasSlug ? (
                          <tr
                            key={sub.slug}
                            className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
                            onClick={() =>
                              (window.location.href = `/submission/${sub.slug}`)
                            }
                          >
                            {rowContent}
                          </tr>
                        ) : (
                          <tr
                            key={idx}
                            className="border-t border-zinc-200 dark:border-zinc-800"
                          >
                            {rowContent}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                {submissions.length > itemsPerPage && (
                  <div className="flex items-center justify-between px-2 py-4 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="text-xs text-zinc-500">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, submissions.length)} of {submissions.length} entries
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Previous
                      </button>

                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 px-2">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <AnimatePresence>
          {IsDeleteOpen && (
            <motion.div
              key="delete-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            // onClick={(e) => e.target === e.currentTarget && cancelDelete()}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 25 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                {/* Header */}
                <div className="bg-red-50 border-b border-red-100 px-6 py-5 flex items-start gap-4">
                  <div className="p-2.5 bg-red-100 rounded-xl shrink-0">
                    <AlertTriangle size={22} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <button
                      onClick={handleDeleteUserProfile}
                      className="text-lg font-bold text-gray-900"
                    >
                      Delete Profile
                    </button>
                    <p className="text-sm text-gray-500 mt-0.5">
                      This action is permanent and cannot be undone.
                    </p>
                  </div>
                  <button className="p-1.5 cursor-pointer rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
                    <X
                      size={18}
                      onClick={() => {
                        setIsDeleteOpen(false);
                        setConfirmDelete("");
                      }}
                    />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 space-y-5">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You are about to permanently delete your profile{" "}
                    <span className="font-semibold text-gray-900"></span>. All
                    ratings, solutions, and submissions will be lost forever.
                  </p>

                  {/* Name confirmation input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Type the username to confirm:
                    </label>
                    <div className="text-xs text-gray-500 font-mono bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 select-all">{userProfile?.username || ""}</div>
                    <input
                      type="text"
                      placeholder="Type the username name exactly..."
                      autoFocus
                      onChange={(e) => setConfirmDelete(e.target.value)}
                      value={confirmDelete}
                      className={`${confirmDelete.trim().toLowerCase() != (userProfile?.username).trim().toLowerCase() ? "bg-red-100 text-red-400 border-red-300 ring-2 ring-red-100" : "border-green-300 ring-2  ring-green-100 bg-green-100 text-green-400"} px-4 py-2.5 border rounded-xl text-sm w-full outline-none transition-all`}
                    />

                    {confirmDelete.trim().toLowerCase() != (userProfile?.username).trim().toLowerCase() && <p className="text-xs text-red-500">
                      Name doesn't match. Please type it exactly.
                    </p>}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3 justify-end">
                  <button
                    onClick={() => {
                      setIsDeleteOpen(false);
                      setConfirmDelete("");
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={
                      confirmDelete.trim().toLowerCase() != (userProfile?.username).trim().toLowerCase()
                    }
                    onClick={handleDeleteUserProfile}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 transition-all ${confirmDelete.trim().toLowerCase() != (userProfile?.username).trim().toLowerCase() ? "bg-red-200 text-red-400 cursor-not-allowed" : "cursor-pointer bg-green-100 text-green-400 border-green-500"}`}
                  >
                    <Trash2 size={14} />
                    Delete Profile
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysInMonth = (year, monthIndex) =>
  new Date(year, monthIndex + 1, 0).getDate();

const MonthActivityGrid = ({ submissions = [] }) => {
  const year = new Date().getFullYear();
  
  const activityMap = useMemo(() => {
    const map = {};
    submissions.forEach(sub => {
      if (sub.submittedAt) {
        const dateObj = new Date(sub.submittedAt);
        if (dateObj.getFullYear() === year) {
          const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
          map[dateStr] = (map[dateStr] || 0) + 1;
        }
      }
    });
    return map;
  }, [submissions, year]);

  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex items-start gap-8 min-w-max pr-2">
        {monthNames.map((m, idx) => {
          const dim = daysInMonth(year, idx);
          const cols = Math.ceil(dim / 7);
          return (
            <div key={m} className="flex flex-col items-center">
              <div
                className="grid gap-1"
                style={{
                  gridAutoFlow: "column",
                  gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {[...Array(dim)].map((_, d) => {
                  const dateStr = `${year}-${String(idx + 1).padStart(2, '0')}-${String(d + 1).padStart(2, '0')}`;
                  const count = activityMap[dateStr] || 0;
                  
                  let bgColor = "bg-zinc-100 dark:bg-zinc-800";
                  if (count > 0 && count <= 2) bgColor = "bg-emerald-200 dark:bg-emerald-900";
                  else if (count > 2 && count <= 4) bgColor = "bg-emerald-400 dark:bg-emerald-700";
                  else if (count > 4) bgColor = "bg-emerald-500 dark:bg-emerald-500";

                  return (
                    <div
                      key={d}
                      className={`h-2.5 w-2.5 rounded-[3px] ${bgColor}`}
                      title={`${m} ${d + 1}, ${year}: ${count} submissions`}
                    />
                  );
                })}
              </div>
              <span className="mt-2 text-[11px] text-zinc-500">{m}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
