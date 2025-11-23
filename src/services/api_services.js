const ENV = import.meta.env.MODE; // Vite automatically sets this

const API_URLS = {
  development: import.meta.env.VITE_DEVELOPMENT_API_URL,
  production: import.meta.env.VITE_PRODUCTION_API_URL,
};

// export const BASE_URL =
//   API_URLS[ENV] && API_URLS[ENV].startsWith("http")
//     ? API_URLS[ENV]
//     : (() => {
//         console.warn("⚠️ Invalid API URL — falling back to development URL");
//         return API_URLS.development;
//     })();
      
// export const BASE_URL = "http://127.0.0.1:8000"; // Default to development
export const BASE_URL = "http://13.233.251.24:8080"; // Default to Staging

export const apiURL = "/api/v1";
export const endpoint = `${BASE_URL}${apiURL}`;

// Here using Django and the backend framework every single module connect as a app
// App main endpoint
export const user = `${endpoint}/user`;
export const restaurant = `${endpoint}/restaurant`;

// Auth endpoints
export const sentOTPEndpoint = `${user}/sent-otp/`;
export const passwordResetOTPEndpoint = `${user}/password-reset-otp/`;
export const reSentOTPEndpoint = `${user}/resent-otp/`;
export const verifyOTPEndpoint = `${user}/verify-otp/`;
export const signInAPIEndpoint = `${user}/signin/`;
export const signUpAPIEndpoint = `${user}/signup/`;
export const profileURL = `${user}/profile/`;
export const ProfileUpdateURL = (id) => `${user}/profile/${id}/`;
export const changePasswordAPIEndpoint = (id) => `${user}/change-password/${id}/`;
export const changePasswordEndpoint = `${user}/password-change-confirm/`;
export const userListEndpoint = `${user}/users/`;
export const userUpdateDeleteEndpoint = (id) => `${user}/user/${id}/`;

// Restaurant
export const createRestaurantEndpoint = `${user}/create-restaurant/`;
export const updateRestaurantEndpoint = (id) => `${user}/restaurant-update/${id}/`;
export const restaurantProfileStatusCheckEndpoint = `${user}/restaurant-profile-status/`;
export const companyStatusChangeEndpoint = (id) => `${user}/restaurant-status/${id}/`;
export const BannerCreateListEndPoint = `${restaurant}/banners/`;
export const BannerUpdateDeleteURL = (id) => `${restaurant}/banner/${id}`;

// Food
export const CategoryListCreateAPIEndPoint = `${restaurant}/categories/`;
export const CategoryUpdateDeleteAPIEndPoint = (id) => `${restaurant}/category/${id}/`;
export const CreateFoodAPIEndpoint = `${restaurant}/food-create/`;
export const FoodsAPIEndpoint = `${restaurant}/foods/`;
export const foodUpdateDeleteAPIEndpoint = (id) => `${restaurant}/food/${id}/`;

// Store catalogue
export const SuperAdminDashboardEndpoint = `${user}/dashboard/super-admin/`;
