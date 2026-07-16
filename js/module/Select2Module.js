export default function Select2Module() {
    $(document).ready(function() {
        $('.re-select-main').select2();
    });
    $(document).ready(function() {
        $('.wpcf7-select').select2();
    });
    $(document).ready(function() {
        $('.re-select-main2').select2(
            {
                dropdownCssClass: "custom-dropdown",
            }
        );
    });

    
}