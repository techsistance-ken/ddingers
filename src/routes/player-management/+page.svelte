<script>
    import { playerManagementStore } from "../../stores/playerManagementStore";
    import { playersStore } from "../../stores/playersStore";
    import {
        Breadcrumb,
        BreadcrumbItem,
        Alert,
        Chevron,
        Dropdown,
        Helper,
        P,
        Card,
        Button,
        Label,
        Input,
        Radio,
    } from "flowbite-svelte";
    import { has, assoc, compose, concat, filter, length, match, defaultTo, prop } from "ramda";
    import PlayerCard from "../../components/PlayerCard.svelte";
    import { base } from "$app/paths";
    import { goto, afterNavigate } from "$app/navigation";
    import PlayerTag from "../../components/PlayerTag.svelte";
    import PlayerMangementList from "../../components/PlayerMangementList.svelte";
    import PlayerManagementDelete from "../../components/PlayerManagementDelete.svelte";
    import PlayerManagementForm from "../../components/PlayerManagementForm.svelte";

    const PAGE_MODE_LIST = "list";
    const PAGE_MODE_EDIT = "edit";
    const PAGE_MODE_NEW = "new";
    const PAGE_MODE_DELETE = "delete";

    let pageMode = "list";

    /**
     * @type {{ 
     *    id: string;
     *    name: string;
     *    tag: string;
     *    color: string;
     *  } | null}
     */
    let playerEdit = null;
    let testStr = "";

    const cancelAddNew = () => {
        pageMode = PAGE_MODE_LIST;
        playerEdit = null;
    };

    const deletePlayerConfirmed = () => {
        playersStore.deletePlayer(playerEdit == null ? "" : playerEdit.id);
        playerEdit = null;
        pageMode = PAGE_MODE_LIST;
    };
    const formErrorInitial = {
            tagError: "",
            nameError: "",
            hasError: false,
        };

    let formError = formErrorInitial;
    const addNewPlayer = (
        /** @type {string} */ playerName, 
        /** @type {string} */ tag, 
        /** @type {string} */ tagColor) => {
        const updateError = (
            /** @type {string} */ fld,
            /** @type {string} */ msg
        ) => compose(assoc(fld, msg), assoc("hasError", true));

        const removePlayerBeingEditted = (/** @type {any[]} */ playersList) =>
            pageMode == PAGE_MODE_EDIT ? 
                filter((/** @type {{ id: any; }} */ x) => x.id != prop("id",playerEdit))(playersList) 
                : playersList;
        const checkDupTags = (/** @type {string} */ tag) =>
            filter((/** @type {{ tag: string; }} */ x) => x.tag == tag)(
                removePlayerBeingEditted($playersStore.players)
            );
        const checkDupName = (/** @type {string} */ name) =>
            filter((/** @type {{ name: string; }} */ x) => x.name == name)(
                removePlayerBeingEditted($playersStore.players)
            );

        formError = formErrorInitial;

        formError = compose(
            (/** @type {any} */ e) =>
                !e.hasError && checkDupName(playerName).length > 0
                    ? updateError("nameError", "Player Name Already Exists")(e)
                    : e,
            (/** @type {any} */ e) =>
                !e.hasError && checkDupTags(tag).length > 0
                    ? updateError("tagError", "Tag Already Exists")(e)
                    : e,
            (/** @type {any} */ e) =>
                length(match(/^[A-Za-z0-9_-]{4,32}$/, playerName)) == 0
                    ? updateError(
                          "nameError",
                          "Player Name must be between 4 and 32 characters and numbers, letters, underscore and dashes."
                      )(e)
                    : e,
            (/** @type {any} */ e) =>
                length(match(/^[A-Za-z0-9]{1,2}$/, tag)) == 0
                    ? updateError(
                          "tagError",
                          "Tag must be 1 or 2 characters, numbers and letters only."
                      )(e)
                    : e
        )(formError);

        if (!formError.hasError) {
            pageMode == PAGE_MODE_NEW
                ? playersStore.addPlayer(playerName, tag, tagColor)
                : playersStore.updatePlayer(
                      prop("id",playerEdit),
                      playerName,
                      tag,
                      tagColor
                  );

            pageMode = PAGE_MODE_LIST;
            playerEdit = null;
            playerName = "";
            tagColor = "orange";
            tag = "";
        }
    };

    /**
     * @type {any[]}
     */
    let listToValidate = $playersStore.players;

    const removePlayerBeingEditted = (/** @type {any[]} */ playersList) =>
        pageMode == PAGE_MODE_EDIT
            ? filter((/** @type {{ id: any; }} */ x) => x.id != prop("id",playerEdit))(playersList)
            : playersList;

    const editPlayer = (/** @type {{ id: string; name: string; tag: string; color: string; } | null} */ player) => {
        pageMode = PAGE_MODE_EDIT;
        playerEdit = player;
        console.log("pm", player);
    };

    const deletePlayer = (/** @type {{ id: string; name: string, tag: string, color: string } | null} */ player) => {
        pageMode = PAGE_MODE_DELETE;
        playerEdit = player;
    };

    const getCreateorEditButtonText = () =>
        pageMode == PAGE_MODE_EDIT ? "Update Player" : "Create Player";
</script>

<div class="season-container">
    <div style="margin-bottom: 8px;">
        <Breadcrumb aria-label="Default breadcrumb example" solid>
            <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
            <BreadcrumbItem>Player Management</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <h2>Player Managemenet</h2>

    {#if pageMode == PAGE_MODE_LIST}
        <PlayerMangementList
            playerList={$playersStore.players}
            on:edit={(e) => editPlayer(e.detail)}
            on:delete={(e) => deletePlayer(e.detail)}
            on:add={(e) => (pageMode = PAGE_MODE_NEW)}
        />
    {:else if pageMode == PAGE_MODE_NEW || pageMode == PAGE_MODE_EDIT}
        <PlayerManagementForm
          on:save={(e) => addNewPlayer(e.detail.name, e.detail.tag, e.detail.tagColor)}
          on:cancel={(e) => cancelAddNew()}
          formError={formError}
          tag={pageMode==PAGE_MODE_NEW ? "" : prop("tag",playerEdit)}
          tagColor={pageMode==PAGE_MODE_NEW ? "" : prop("color",playerEdit)}
          playerName={pageMode==PAGE_MODE_NEW ? "" : prop("name",playerEdit)}
        />
    {:else if pageMode == PAGE_MODE_DELETE}
        <PlayerManagementDelete
            {playerEdit}
            on:cancel={(e) => cancelAddNew()}
            on:confirm={(e) => deletePlayerConfirmed()}
        />
    {/if}
</div>

<style>
    .season-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
